import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TelegramMessage,
  TelegramMessageDocument,
} from '../schemas/telegram-message.schema';

@Injectable()
export class TelegramMessageRepository {
  constructor(
    @InjectModel(TelegramMessage.name)
    private telegramMessageModel: Model<TelegramMessageDocument>,
  ) {}

  async saveTelegramMessage(platform: string, payload: any) {
    const telegramMessage = new this.telegramMessageModel({
      platform,
      payload,
    });
    return await telegramMessage.save();
  }

  async getTelegramMessagesByPlatform(platform: string) {
    return await this.telegramMessageModel.find({ platform }).exec();
  }
}
