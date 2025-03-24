import { Module } from '@nestjs/common';
import { WebhookService } from './services/webhook.service';
import { WhatsappController } from './controllers/whatsapp.controller';
import { TelegramController } from './controllers/telegram.controller';
import { FacebookController } from './controllers/facebook.controller';
import { DatabaseModule } from '../database/database.module'
import { TelegramService } from 'src/telegram/telegram.service';
import { MessageBrokerService } from 'src/message-broker/message-broker.service';
import { FacebookService } from 'src/facebook/facebook.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    WhatsappController, 
    TelegramController, 
    FacebookController
  ],
  providers: [
    TelegramService,
    FacebookService,
    WhatsappService,
    WebhookService,
    MessageBrokerService
  ],
})
export class WebhookModule {}