import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramMessage, TelegramMessageSchema } from './schemas/telegram-message.schema';
import { NormalizedMessage, NormalizedMessageSchema } from './schemas/normalized-message.schema';
//import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { NormalizedMessageRepository } from './repositories/normalized-message.repository';
import { TelegramMessageRepository } from './repositories/telegram-message.repository';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: TelegramMessage.name, schema: TelegramMessageSchema, collection: 'telegramMessages' },
      { name: NormalizedMessage.name, schema: NormalizedMessageSchema, collection: 'normalizedMessages' },
    ]),
  ],
  providers: [
    NormalizedMessageRepository,
    TelegramMessageRepository
  ],
  exports: [
    NormalizedMessageRepository,
    TelegramMessageRepository
  ],
})
export class DatabaseModule {}
