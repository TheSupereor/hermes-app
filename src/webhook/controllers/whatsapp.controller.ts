// src/webhook/controllers/whatsapp.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { WhatsappAdapter } from '../../commom/adapters/whatsapp.adapter';
import { NormalizedMessage } from 'src/database/schemas/normalized-message.schema';
import ChopAndLockMessages from 'src/commom/helpers/ChopAndLock';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Controller('webhook/whatsapp')
export class WhatsappController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly wppServ: WhatsappService
  ) {}

  @Post()
  async handleWhatsappMessage(@Body() payload: any) {
    const adapter = new WhatsappAdapter();
    const standardizedMessage = adapter.transformPayload(payload);
    (
          await this.webhookService.handleMessage(
            'whatsapp',
            standardizedMessage,
            payload,
          )
        ).subscribe({
          next: async (value: NormalizedMessage) => ChopAndLockMessages(value, this.wppServ),
          // ToDo tratar mensagens complexas
          error: (error) => {
            console.error('Erro ao enviar mensagem:', error.message);
            const errorMessage = adapter.createMessageFromError(
              'Ocorreu um erro ao processar sua mensagem',
              payload.message!.chat.id,
            );
            this.wppServ.sendErrorResponse(errorMessage);
          },
        });
        return { status: 'mensagem enviada' };
  }

  @Get()
    handleFacebookHandshake(@Query() params: any) {
      console.log(params);
      const VERIFY_TOKEN = process.env.WPP_VALIDATION_TOKEN;
      const mode = params['hub.mode'];
      const token = params['hub.verify_token'];
      const challenge = params['hub.challenge'];
  
      if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) return challenge;
        else return { message: 'invalid', status: 403 };
      } else return { message: 'invalid', status: 403 };
    }
}
