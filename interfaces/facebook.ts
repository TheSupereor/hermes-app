export interface FacebookMessageEvent {
  object: string;
  entry: FacebookMessageEntry[];
}

export interface FacebookMessageEntry {
  time: number;
  id: string;
  messaging: FacebookMessageEntryMessaging[];
}

export interface FacebookMessageEntryMessaging {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  message: {
    mid: string;
    text: string;
  };
}

export interface FacebookSendMessageResponse {
  recipient_id: string,
  message_id: string
}