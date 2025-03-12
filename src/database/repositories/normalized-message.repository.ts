import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NormalizedMessage,
  NormalizedMessageDocument,
} from '../schemas/normalized-message.schema';

@Injectable()
export class NormalizedMessageRepository {
  constructor(
    @InjectModel(NormalizedMessage.name)
    private normalizedMessageModel: Model<NormalizedMessageDocument>,
  ) {}

  async saveNormalizedMessage(
    uid: number,
    platform: string,
    from: string,
    message: string,
    timestamp: Date,
    accountIdentifier: string
  ) {
    const normalizedMessage = new this.normalizedMessageModel({
      uid,
      platform,
      from,
      message,
      timestamp,
      accountIdentifier
    });
    return await normalizedMessage.save();
  }

  async getMessagesByPlatform(platform: string) {
    return await this.normalizedMessageModel.find({ platform }).exec();
  }
}
