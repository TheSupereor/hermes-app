// src/webhook/controllers/telegram.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { TelegramAdapter } from '../adapters/telegram.adapter';

@Controller('webhook/telegram')
export class TelegramController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async handleTelegramMessage(@Body() payload: any) {
    const adapter = new TelegramAdapter();
    const normalizedData = adapter.transformPayload(payload);
    return await this.webhookService.handleMessage('telegram', normalizedData, payload);
  }
}
