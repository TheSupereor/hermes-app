import { WhatsappMessageEvent } from "interfaces/whatsapp";

// src/webhook/adapters/whatsapp.adapter.ts
export class WhatsappAdapter {
    transformPayload(payload: WhatsappMessageEvent): any {
        console.log('WhatsappAdapter payload');
        console.log(JSON.stringify(payload));
        const normalizedMessage = {
          uid: payload.entry[0].changes[0].value.messages[0].from,
          from: payload.entry[0].changes[0].value.contacts[0].profile.name, // obter nome de user com API
          message: payload.entry[0].changes[0].value.messages[0].text.body,
          timestamp: payload.entry[0].changes[0].value.messages[0].timestamp,
          platform: 'whatsapp',
          accountIdentifier: payload.entry[0].changes[0].value.metadata.display_phone_number,
        };
        return normalizedMessage;
      }

      createMessageFromError(text: string, uid: string): any {
        return {
          uid,
          text
        }
      }
  }
  