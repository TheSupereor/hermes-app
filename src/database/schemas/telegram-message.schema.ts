import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TelegramPayloadDto } from '../DTOs/telegram-payload.dto';

export type TelegramMessageDocument = TelegramMessage & Document;

@Schema({ timestamps: true })
export class TelegramMessage {
  //@Prop({ required: true })
  //name: string;
  
  @Prop({ required: true })
  platform: string; // Ex: 'telegram', 'whatsapp', 'facebook'

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  payload: TelegramPayloadDto;
}
export const TelegramMessageSchema = SchemaFactory.createForClass(TelegramMessage);