import { Injectable } from '@nestjs/common';
import { NormalizedMessageInterface } from 'interfaces/webhook';
import AxiosInstance from 'src/commom/Axios/axios';

@Injectable()
export class TelegramService {
  sendResponse(response: NormalizedMessageInterface): void {
		const sentTgMessage = AxiosInstance.post(`/sendMessage`, {
			chat_id: response.uid,
			text: response.message
		})
    console.log('resposta', response); // enviar resposta comum
  }

  sendErrorResponse(error: any): void {
		const sentTgMessage = AxiosInstance.post(`/sendMessage`, {
			chat_id: error.uid,
			text: error.message
		})
    console.error('erro ao processar mensagem telegram', error); // Enviar resposta de erro
  }
}
