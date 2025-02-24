// src/webhook/adapters/facebook.adapter.ts
export class FacebookAdapter {
    transformPayload(payload: any): any {
      return {
        from: payload.sender.id,
        message: payload.message.text,
        timestamp: payload.timestamp,
      };
    }
  }
  