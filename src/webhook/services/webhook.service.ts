import { Injectable } from '@nestjs/common';
import { TelegramMessageRepository } from '../../database/repositories/telegram-message.repository';
import { NormalizedMessageRepository } from '../../database/repositories/normalized-message.repository';
import { TelegramMessage as TelegramMessageInterface } from 'interfaces/webhook';

@Injectable()
export class WebhookService {
  constructor(
    private readonly normalizedMessageRepo: NormalizedMessageRepository,
    private readonly telegramMessageRepo: TelegramMessageRepository,

    //@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
  ) {}

  async handleMessage(
    platform: string,
    normalizedData: any,
    rawPayload: TelegramMessageInterface,
  ) {
    // Salva a mensagem raw exatamente como chegou
    this.telegramMessageRepo.saveTelegramMessage(platform, rawPayload);

    // Salva a mensagem normalizada
    this.normalizedMessageRepo.saveNormalizedMessage(
      platform,
      normalizedData.from,
      normalizedData.message,
      new Date(),
    );

    // publicar mensagem
    //this.client.emit('formatted-message', normalizedData);
    return { success: true, message: 'Mensagem salva (raw e normalizada).' };
  }
}
