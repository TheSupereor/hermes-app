import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NormalizedMessageDocument = NormalizedMessage & Document;

@Schema({ timestamps: true })
export class NormalizedMessage {
  @Prop({ required: true })
  uid: number;

  @Prop({ required: true })
  platform: string;           // Pode ser interessante guardar de qual plataforma veio

  @Prop({ required: true })
  from: string;               // username

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  accountIdentifier: string;   // identificador da conta recebedora
}

export const NormalizedMessageSchema = SchemaFactory.createForClass(NormalizedMessage);
