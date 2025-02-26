import { Injectable } from '@nestjs/common';
import { TelegramMessageRepository } from '../../database/repositories/telegram-message.repository';
import { NormalizedMessageRepository } from '../../database/repositories/normalized-message.repository';
import { TelegramMessage as TelegramMessageInterface } from 'interfaces/webhook';
import { MessageBrokerService } from 'src/message-broker/message-broker.service';
import { timeout } from 'rxjs';

@Injectable()
export class WebhookService {
  constructor(
    private readonly normalizedMessageRepo: NormalizedMessageRepository,
    private readonly telegramMessageRepo: TelegramMessageRepository,
    private readonly messageBrokerSrvc: MessageBrokerService,
  ) {}

  async handleMessage(
    platform: string,
    normalizedData: any,
    rawPayload: TelegramMessageInterface,
  ) {
    // Salva a mensagem raw exatamente como chegou
    this.telegramMessageRepo.saveTelegramMessage(
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
    );

    // publicar mensagem
    const MBClient = this.messageBrokerSrvc.getClient();
    return MBClient.emit('processed_message', normalizedData)
    // return MBClient.send({ cmd: 'processed_message' }, normalizedData) // Envia como GRC para receber resposta
    //   .pipe(timeout(10000)); // máximo de tempo para aguardar resposta do serviço de resposta
  }
}
