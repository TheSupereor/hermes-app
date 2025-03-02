// Interfaces Ligadas ao Telegram

interface TelegramSendMessageResponse {
    ok: boolean,
    result: TelegramMessage
}

interface TelegramUpdate {
  update_id: number;
  // Pode vir somente uma das duas propriedades, dependendo do tipo de evento
  message?: TelegramMessage;
  callback_query?: CallbackQuery;
}

// mensagem enviada pelo Telegram
interface TelegramMessage {
  message_id: number;
  from?: User;
  chat: Chat;
  date: number;
  text?: string;
  reply_markup?: InlineKeyboardMarkup;
}

// callback de botão inline
interface CallbackQuery {
  id: string;
  from: User;
  message: TelegramMessage;
  chat_instance: string;
  data?: string;
}

// usuário
interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

// chat
interface Chat {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  type: string;
}

// teclado inline presente na mensagem
interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

// botão do teclado inline
interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
}

export {
  TelegramMessage,
  TelegramUpdate,
  CallbackQuery,
  Chat,
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  User,
  TelegramSendMessageResponse,
};
