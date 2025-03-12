import { NormalizedMessage } from "src/database/schemas/normalized-message.schema";
import lockFactory from "./lockManager";

const lock = lockFactory('telegramMessageLocks');

export default async function ChopAndLockMessages(value: NormalizedMessage, service: any) {
    // Mensagem muito longa, partindo e enviando
    const arrayOfMessages = value.message.split('\n');
    const chunkSize = 10;
    let sendMessageObj = value;
    for (let i = 0; i < arrayOfMessages.length; i += chunkSize) {
      const chunk = arrayOfMessages.slice(i, i + chunkSize);
      sendMessageObj.message = chunk.join('\n');
      const messageLock = lock.acquire(sendMessageObj.uid);
      service.sendResponse(sendMessageObj).then(data => {
        console.log(`Resposta de envio de mensagem -`, JSON.stringify(data))
        lock.release(value.uid);
      })
      await messageLock;
    }
    return { status: 'mensagem enviada' };
  }