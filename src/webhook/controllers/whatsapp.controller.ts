// src/webhook/controllers/whatsapp.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { WhatsappAdapter } from '../adapters/whatsapp.adapter';

@Controller('webhook/whatsapp')
export class WhatsappController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  handleWhatsappMessage(@Body() payload: any) {
    const adapter = new WhatsappAdapter();
    const standardizedMessage = adapter.transformPayload(payload);
    return this.webhookService.handleMessage('whatsapp', standardizedMessage, payload);
  }
}
