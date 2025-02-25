import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { WebhookModule } from './webhook/webhook.module';
import { DatabaseModule } from './database/database.module';
import { MessageBrokerModule } from './message-broker/message-broker.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: 'hermes-app'
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    WebhookModule,
    MessageBrokerModule,
    TelegramModule,
  ],
  providers: [],
})
export class AppModule {}
