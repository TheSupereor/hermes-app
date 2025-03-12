import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PlatformMessage, PlatformMessageDocument, PlatformMessageSchema } from '../schemas/platform-message.schema';

@Injectable()
export class PlatformMessageRepository {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  private getCollectionName(platform: string): string {
    switch (platform.toLowerCase()) {
      case 'telegram':
        return 'telegramMessages';
      case 'whatsapp':
        return 'whatsappMessages';
      case 'facebook':
        return 'facebookMessages';
      default:
        return 'defaultPlatformMessages';
    }
  }

  private getPlatformMessageModel(collectionName: string): Model<PlatformMessageDocument> {
    return this.connection
      .model(PlatformMessage.name, PlatformMessageSchema, collectionName) as Model<PlatformMessageDocument>;
  }

  async savePlatformMessage(platform: string, payload: any): Promise<PlatformMessageDocument> {
    const collectionName = this.getCollectionName(platform);
    const PlatformMessageModel = this.getPlatformMessageModel(collectionName);
    
    const platformMessage = new PlatformMessageModel({
      platform,
      payload,
    });
    return await platformMessage.save();
  }

  async getPlatformMessagesByPlatform(platform: string): Promise<PlatformMessageDocument[]> {
    const collectionName = this.getCollectionName(platform);
    const PlatformMessageModel = this.getPlatformMessageModel(collectionName);
    
    return await PlatformMessageModel.find({ platform }).exec();
  }
}