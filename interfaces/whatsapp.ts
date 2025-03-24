export interface WhatsappMessageEvent {
  object: string;
  entry: WhatsappMessageEntry[];
}

export interface WhatsappMessageEntry {
  id: string;
  changes: WhatsappChangeMessage[];
}

export interface WhatsappChangeMessage {
  value: WhatsappChangeValue;
  field: string;
}

export interface WhatsappChangeValue {
  messaging_product: 'whatsapp';
  metadata: WhatsappChangeMetadata;
  contacts: WhatsappChangeContacts[];
  messages: WhatsappChangeMessages[];
}

export interface WhatsappChangeMetadata {
  display_phone_number: string;
  phone_number_id: string;
}

export interface WhatsappChangeContacts {
  profile: {
    name: string;
  };
  wa_id: string;
}

export interface WhatsappChangeMessages {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: string;
}

export interface WhatsappSendMessageResponse {
  messaging_product: "whatsapp",
  contacts: [
    {
      input: string,
      wa_id: string
    }
  ],
  messages: [
    {
      id: string
    }
  ]
}