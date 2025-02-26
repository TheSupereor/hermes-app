import { TelegramUpdate as TelegramMessageInterface } from "interfaces/webhook";

export class TelegramAdapter {
  // adaptador de mensagens telegram

  toStandardMessage(payload: TelegramMessageInterface): any {
    console.log('TelegramAdapter: ', JSON.stringify(payload));
    return {
      uid: payload.message.chat.id,
      from: `${payload.message.from.first_name} ${payload.message.from.last_name}`, // username
      message: payload.message.text,
      timestamp: payload.message.date,
    };
  }

  toTelegramMessage(payload: any): any {
    
    return {

    }
  }
}
