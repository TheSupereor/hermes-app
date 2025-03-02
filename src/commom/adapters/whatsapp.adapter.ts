// src/webhook/adapters/whatsapp.adapter.ts
export class WhatsappAdapter {
    transformPayload(payload: any): any {
      // Exemplo de transformação (ajuste conforme o payload real)
      return {
        from: payload.sender,         // Mapeando campo "sender" para "from"
        message: payload.text,        // Mapeando "text" para "message"
        timestamp: payload.time,      // Mapeando "time" para "timestamp"
      };
    }
  }
  