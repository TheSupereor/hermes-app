import { Injectable } from '@nestjs/common';
import { TelegramSendMessageResponse } from 'interfaces/telegram';
import { NormalizedMessageInterface } from 'interfaces/webhook';
import AxiosInstance from 'src/commom/Axios/axios';

const TelegramBaseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

@Injectable()
export class TelegramService {
  async sendResponse(response: NormalizedMessageInterface): Promise<TelegramSendMessageResponse> {
		try {
			const sentTgMessage = await AxiosInstance.post(`/sendMessage`, TelegramBaseURL, {
				chat_id: response.uid,
				text: response.message
			})
			return sentTgMessage.data;
		} catch (error) {
			console.error('Erro aconteceu tentando enviar mensagem: ', error)
			throw error;
		}
  }

  sendErrorResponse({ chat_id, text }): any {
		const sentTgMessage = AxiosInstance.post(`/sendMessage`, TelegramBaseURL, {
			chat_id,
			text
		})
    console.error('erro ao processar mensagem telegram', chat_id); // Enviar resposta de erro
		return sentTgMessage;
	}
}
