import { Module } from '@nestjs/common';
import { WebhookService } from './services/webhook.service';
import { WhatsappController } from './controllers/whatsapp.controller';
import { TelegramController } from './controllers/telegram.controller';
import { FacebookController } from './controllers/facebook.controller';
import { DatabaseModule } from '../database/database.module'
import { MessageBrokerModule } from 'src/message-broker/message-broker.module';
import { TelegramService } from 'src/telegram/telegram.service';

@Module({
  imports: [
    DatabaseModule,
    MessageBrokerModule,
    TelegramService
  ],
  controllers: [
    WhatsappController, 
    TelegramController, 
    FacebookController
  ],
  providers: [
    WebhookService,
  ],
})
export class WebhookModule {}