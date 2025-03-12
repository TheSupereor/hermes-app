import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformMessage, PlatformMessageSchema } from './schemas/platform-message.schema';
import { NormalizedMessage, NormalizedMessageSchema } from './schemas/normalized-message.schema';
//import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { NormalizedMessageRepository } from './repositories/normalized-message.repository';
import { PlatformMessageRepository } from './repositories/platform-message.repository';
import { businessAccounts, businessAccountsSchema } from './schemas/business-accounts.schema';
import { BusinessAccountRepository } from './repositories/business-accounts.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([
      { name: PlatformMessage.name, schema: PlatformMessageSchema, collection: 'telegramMessages' },
      { name: NormalizedMessage.name, schema: NormalizedMessageSchema, collection: 'normalizedMessages' },
      { name: businessAccounts.name, schema: businessAccountsSchema, collection: 'businessAccounts' },
    ]),
  ],
  providers: [
    NormalizedMessageRepository,
    PlatformMessageRepository,
    BusinessAccountRepository,
  ],
  exports: [
    NormalizedMessageRepository,
    PlatformMessageRepository,
    BusinessAccountRepository,
  ],
})
export class DatabaseModule {}
