// src/webhook/controllers/facebook.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { FacebookAdapter } from '../adapters/facebook.adapter';

@Controller('webhook/facebook')
export class FacebookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  handleFacebookMessage(@Body() payload: any) {
    const adapter = new FacebookAdapter();
    const standardizedMessage = adapter.transformPayload(payload);
    return this.webhookService.handleMessage('facebook', standardizedMessage, payload);
  }
}
