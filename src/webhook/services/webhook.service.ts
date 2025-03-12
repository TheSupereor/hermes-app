import { Injectable } from '@nestjs/common';
import { PlatformMessageRepository } from '../../database/repositories/platform-message.repository';
import { NormalizedMessageRepository } from '../../database/repositories/normalized-message.repository';
import { TelegramMessage as TelegramMessageInterface } from 'interfaces/telegram';
import { MessageBrokerService } from 'src/message-broker/message-broker.service';
import { catchError, take, throwError, timeout } from 'rxjs';
import { NormalizedMessageInterface } from 'interfaces/webhook';
import { BusinessAccountRepository } from 'src/database/repositories/business-accounts.repository';

@Injectable()
export class WebhookService {
  constructor(
    private readonly normalizedMessageRepo: NormalizedMessageRepository,
    private readonly platformMessageRepo: PlatformMessageRepository,
    private readonly busAccRepo: BusinessAccountRepository,
    private readonly messageBrokerSrvc: MessageBrokerService,
  ) {}

  async handleMessage(
    platform: string,
    normalizedData: NormalizedMessageInterface,
    rawPayload: TelegramMessageInterface,
  ) {
    // Salva a mensagem raw exatamente como chegou
    this.platformMessageRepo.savePlatformMessage(
      platform, 
      rawPayload
    );

    // Salva a mensagem normalizada
    this.normalizedMessageRepo.saveNormalizedMessage(
      normalizedData.uid,
      platform,
      normalizedData.from,
      normalizedData.message,
      new Date(),
      normalizedData.accountIdentifier
    );

    // obter identificador do bot que deve responder
    const account = await this.busAccRepo.getBusinessAccountsByIdentifier(normalizedData.accountIdentifier);

    if(account){
      // publicar mensagem
      const MBClient = this.messageBrokerSrvc.getClient();
      //return MBClient.emit('processed_message', normalizedData)
      return MBClient.send({ cmd: 'processed_message' }, {
        ...normalizedData,
        bot_id: account.bot_id
      }) // Envia como GRC para receber resposta
       .pipe(
        take(1), // pra pegar a primeira resposta e *completa o observable*
        timeout(30000), // limite de 30 segundos
        catchError(error => {
          console.error('Erro ou timeout no processamento da mensagem:', error.message);
          return throwError(() => new Error("Tempo limite excedido: o serviço não respondeu em 30 segundos."));
        })
       ); 
    }
    else {
      throw Error(`Uma conta com esse id não foi encontrado no banco, verifique novamente: ${normalizedData.accountIdentifier}`)
    }
  }
}
