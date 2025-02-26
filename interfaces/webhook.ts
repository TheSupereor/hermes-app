
export interface NormalizedMessageInterface {
    uid: string;
    platform: string;
    from: string;               // username
    message: string;
    timestamp: Date;
}

export interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    language_code: string;
  }
  
  export interface TelegramChat {
    id: number;
    first_name: string;
    last_name: string;
    type: string;
  }
  
  export interface TelegramMessage {
    message_id: number;
    from: TelegramUser;
    chat: TelegramChat;
    date: number;
    text: string;
  }
  
  export interface TelegramUpdate {
    update_id: number;
    message: TelegramMessage;
  }
