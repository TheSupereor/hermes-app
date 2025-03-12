import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type businessAccountsDocument = businessAccounts & Document;

@Schema({ timestamps: true })
export class businessAccounts {
	// Serve para correlacionar a empresa com o bot que vai responder na api nlp, identificado pelo identificador do bot
  @Prop({ required: true })
  id: number; // Id da empresa
	
	@Prop({ required: true })
	messager_identifier: string;	// identificador da conta

  @Prop({ required: true })
  bot_id: string; // id do bot, 

  @Prop({ required: true })
  platform: string; // plataforma

  @Prop({ required: true })
  webhook: string;	// endereço de envio das mensagens

  @Prop({ required: false })
  access_token: string;	// endereço de envio das mensagens
}

export const businessAccountsSchema =
  SchemaFactory.createForClass(businessAccounts);
