// src/webhook/controllers/facebook.controller.ts
import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { FacebookAdapter } from '../../commom/adapters/facebook.adapter';
import { NormalizedMessage } from 'src/database/schemas/normalized-message.schema';
import ChopAndLockMessages from 'src/commom/helpers/ChopAndLock';
import { FacebookService } from 'src/facebook/facebook.service';

@Controller('webhook/facebook')
export class FacebookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly fbSrvc: FacebookService,
  ) {}

  @Post()
  async handleFacebookMessage(@Body() payload: any) {
    const adapter = new FacebookAdapter();
    const standardizedMessage = adapter.transformPayload(payload);
    (
      await this.webhookService.handleMessage(
        'facebook',
        standardizedMessage,
        payload,
      )
    ).subscribe({
      next: async (value: NormalizedMessage) => ChopAndLockMessages(value, this.fbSrvc),
      // ToDo tratar mensagens complexas
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error.message);
        const errorMessage = adapter.createMessageFromError(
          'Ocorreu um erro ao processar sua mensagem',
          payload.message!.chat.id,
        );
        this.fbSrvc.sendErrorResponse(errorMessage);
      },
    });
    return { status: 'mensagem enviada' };
  }

  @Get()
  handleFacebookHandshake(@Query() params: any) {
    console.log(params);
    const VERIFY_TOKEN = process.env.FB_VALIDATION_TOKEN;
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) return challenge;
      else return { message: 'invalid', status: 403 };
    } else return { message: 'invalid', status: 403 };
  }
}
