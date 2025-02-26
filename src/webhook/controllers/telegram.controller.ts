// src/webhook/controllers/telegram.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { TelegramAdapter } from '../adapters/telegram.adapter';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('webhook/telegram')
export class TelegramController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly tlgSrvc: TelegramService
  ) {}

  @Post()
  async handleTelegramMessage(@Body() payload: any) {
    const adapter = new TelegramAdapter();
    const normalizedData = adapter.toStandardMessage(payload);
    // Se inscreve no Observable e envia para o service do telegram
    (await this.webhookService.handleMessage('telegram', normalizedData, payload)).subscribe({ 
      next: (value) => {
        this.tlgSrvc.sendResponse(value);
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.tlgSrvc.sendErrorResponse(error);
      }
    })
    return { status: 'mensagem enviada' };
  }
}
