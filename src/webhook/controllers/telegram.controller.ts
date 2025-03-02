import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { TelegramAdapter } from '../../commom/adapters/telegram.adapter';
import { TelegramService } from 'src/telegram/telegram.service';
import { MBResponse } from 'interfaces/webhook';
import { NormalizedMessage } from 'src/database/schemas/normalized-message.schema';
import lockFactory from 'src/commom/lockManager';

const lock = lockFactory('telegramMessageLocks');
@Controller('webhook/telegram')
export class TelegramController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly tlgSrvc: TelegramService,
  ) {}

  @Post()
  async handleTelegramMessage(@Body() payload: any) {
    const adapter = new TelegramAdapter();
    const normalizedData = adapter.toStandardMessage(payload);
    // Se inscreve no Observable
    (
      await this.webhookService.handleMessage(
        'telegram',
        normalizedData,
        payload,
      )
    ).subscribe({
      next: async (value: NormalizedMessage) => {
        // Mensagem muito longa, partindo e enviando
        const arrayOfMessages = value.message.split('\n');
        const chunkSize = 10;
        let sendMessageObj = value;
        for (let i = 0; i < arrayOfMessages.length; i += chunkSize) {
          const chunk = arrayOfMessages.slice(i, i + chunkSize);
          sendMessageObj.message = chunk.join('\n');
          const messageLock = lock.acquire(sendMessageObj.uid);
          this.tlgSrvc.sendResponse(sendMessageObj).then(data => {
            lock.release(data.result.chat.id);
          })
          await messageLock;
        }
        return { status: 'mensagem enviada' };
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error.message);
        const errorMessage = adapter.createMessageFromError('Ocorreu um erro ao processar sua mensagem', payload.message!.chat.id)
        this.tlgSrvc.sendErrorResponse(errorMessage);
      },
    });
    return { status: 'mensagem enviada' };
  }
}
