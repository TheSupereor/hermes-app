interface NormalizedMessageInterface {
  uid: number;
  platform: string;
  from: string; // username
  message: string;
  timestamp: Date | number;
}

interface MBResponse {
    pattern: {
      cmd: string,
    },
    data: {
        uid: number,
        from: string,
        message: string,
        timestamp: number,
    },
    id: string
}


export {
    NormalizedMessageInterface,
    MBResponse,
}