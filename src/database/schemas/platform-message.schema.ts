import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PlatformMessage {
  @Prop({ required: true })
  platform: string;

  @Prop({ required: true, type: Object })
  payload: any;
}

// Define que o documento é a junção de PlatformMessage com um Document cujo _id é do tipo Types.ObjectId
export type PlatformMessageDocument = PlatformMessage & Document<Types.ObjectId>;

export const PlatformMessageSchema = SchemaFactory.createForClass(PlatformMessage);