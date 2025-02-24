// src/webhook/adapters/telegram.adapter.ts
export class TelegramAdapter {
    transformPayload(payload: any): any {
      console.log('TelegramAdapter: ', JSON.stringify(payload))
      return {
        from: `${payload.message.from.first_name} ${payload.message.from.last_name}`,  // Exemplo: extraindo username
        message: payload.message.text,
        timestamp: payload.message.date,
      };
    }
  }
  