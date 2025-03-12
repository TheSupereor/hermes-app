import { NormalizedMessageInterface} from "interfaces/webhook";
import { TelegramUpdate as TelegramMessageInterface } from "interfaces/telegram"

export class TelegramAdapter {
  // adaptador de mensagens telegram

  toStandardMessage(payload: TelegramMessageInterface, accountIdentifier: string): any {
    try {
      const messageText = payload.callback_query && payload.callback_query.data ? payload.callback_query.data : payload!.message!.text;
      let normalizedMessage;
      if(payload.callback_query){
        normalizedMessage = {
          uid: payload.message!.chat.id,
          from: `${payload.message!.from!.first_name} ${payload.message!.from!.last_name}`, // username
          message: messageText,
          timestamp: payload.message!.date,
          platform: 'telegram',
          accountIdentifier
        }
      }else {
        normalizedMessage = {
          uid: payload!.message!.chat.id,
          from: `${payload.message!.from!.first_name} ${payload.message!.from!.last_name}`, // username
          message: messageText,
          timestamp: payload.message!.date,
          platform: 'telegram',
          accountIdentifier
        }
      }
      return normalizedMessage;
    } catch (error) {
      console.log(error);
    }
    return ;
  }

  toTelegramMessage(payload: NormalizedMessageInterface): any {
    console.log('MessagetoTelegramMessage: ', JSON.stringify(payload));
    // Formatação não necessária
    return {

    }
  }

  createMessageFromError(text: string, chat_id: string): any {
    return {
      chat_id,
      text
    }
  }
}
