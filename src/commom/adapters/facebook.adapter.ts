import { FacebookMessageEvent } from 'interfaces/facebook';
import { extractButtons, extractList, isButtonFormat, isListFormat } from './parsehelpers';
import { chunk } from './chunk';

interface QuickReply {
  content_type: string;
  title: string;
  payload: string;
}

interface Message {
  text: string;
  quick_replies?: QuickReply[];
  attachment?: any;
}

export class FacebookAdapter {
  transformPayload(payload: FacebookMessageEvent): any {
    console.log('FacebookAdapter payload');
    console.log(JSON.stringify(payload));
    const normalizedMessage = {
      uid: payload.entry[0].messaging[0].sender.id,
      from: `----`, // obter nome de user
      message: payload.entry[0].messaging[0].message.text,
      timestamp: payload.entry[0].time,
      platform: 'facebook',
      accountIdentifier: payload.entry[0].id,
    };
    return normalizedMessage;
  }

  // transformando de mensagens para formato fb
  // para quando a IA puder responder com listas e botões
  toFacebookMessage(messages: any[] = []): Message[] {
    let buttons: (string | { title: string; value: string })[] = [];
    let list: (string | { title: string; value: string })[] = [];
    let listChunkSize = 13;

    // map de mensagens
    const processedMessages = messages
      .map((msg) => {
        if (typeof msg === 'object' && (msg.attachment || msg.quick_replies)) {
          return msg;
        }
        if (typeof msg.text === 'string') {
          msg = msg.text;
        }
        if (isButtonFormat(msg)) {
          buttons = extractButtons(msg);
        }
        if (isListFormat(msg)) {
          const match = msg.match(/\((\d+)\)/);
          if (match) {
            listChunkSize = parseInt(match[1], 10);
          }
          list = extractList(msg);
        }
        return msg;
      })
      .filter((msg) => !isButtonFormat(msg) && !isListFormat(msg));

    // para botões
    if (buttons.length !== 0) {
      const lastMessage = processedMessages.pop();
      const quickReplies = buttons.map((button) =>
        typeof button === 'string'
          ? { content_type: 'text', title: button, payload: button }
          : {
              content_type: 'text',
              title: button.title,
              payload: button.value,
            },
      );
      processedMessages.push({
        text: lastMessage,
        quick_replies: quickReplies,
      });
    } else if (list.length !== 0) {
      // Se tem listas
      const lastMessage = processedMessages.pop();
      const chunks = chunk(listChunkSize, list.slice(1));
      // primeira mensagem tem que ser string
      if (typeof list[0] !== 'string') {
        list[0] = list[0].title;
      }
      const quickReplies = chunks[0].map((item) =>
        typeof item === 'string'
          ? { content_type: 'text', title: item, payload: item }
          : { content_type: 'text', title: item.title, payload: item.value },
      );
      processedMessages.push({
        text: lastMessage,
        quick_replies: quickReplies,
      });
    }

    // Converte todas as mensagens para o formato { text: string } 
    return processedMessages.map((msg) =>
      typeof msg === 'string' ? { text: msg } : msg,
    );
  }

  createMessageFromError(text: string, uid: string): any {
    return {
      uid,
      text
    }
  }
}
