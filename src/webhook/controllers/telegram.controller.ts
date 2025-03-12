import { Controller, Post, Body, Param } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { TelegramAdapter } from '../../commom/adapters/telegram.adapter';
import { TelegramService } from 'src/telegram/telegram.service';
import { MBResponse } from 'interfaces/webhook';
import { NormalizedMessage } from 'src/database/schemas/normalized-message.schema';
import ChopAndLockMessages from 'src/commom/helpers/ChopAndLock';

@Controller('webhook/telegram')
export class TelegramController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly tlgSrvc: TelegramService,
  ) {}

  @Post(':id')
  async handleTelegramMessage(@Body() payload: any, @Param('id') id: string) {
    // Todo: buscar no banco correlação entre bot para responder x empresa
    const adapter = new TelegramAdapter();
    const normalizedData = adapter.toStandardMessage(payload, id);
    // Se inscreve no Observable
    (
      await this.webhookService.handleMessage(
        'telegram',
        normalizedData,
        payload,
      )
    ).subscribe({
      next: async (value: NormalizedMessage) => ChopAndLockMessages(value, this.tlgSrvc),
      // ToDo tratar mensagens complexas
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error.message);
        const errorMessage = adapter.createMessageFromError('Ocorreu um erro ao processar sua mensagem', payload.message!.chat.id)
        this.tlgSrvc.sendErrorResponse(errorMessage);
      },
    });
    return { status: 'mensagem enviada' };
  }
}
