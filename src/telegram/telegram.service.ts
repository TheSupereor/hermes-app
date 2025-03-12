import { Injectable } from '@nestjs/common';
import { TelegramSendMessageResponse } from 'interfaces/telegram';
import { NormalizedMessageInterface } from 'interfaces/webhook';
import AxiosInstance from 'src/commom/Axios/axios';
import { BusinessAccountRepository } from 'src/database/repositories/business-accounts.repository';

const TelegramBaseURL = `https://api.telegram.org`;

@Injectable()
export class TelegramService {
  constructor(private readonly busAccRepo: BusinessAccountRepository) {}
	
  async sendResponse(
    response: NormalizedMessageInterface,
  ): Promise<TelegramSendMessageResponse> {
    try {
			const account = await this.busAccRepo.getBusinessAccountsByIdentifier(response.accountIdentifier);
			if(!account) throw new Error(`Conta não encontrada no Banco de Dados - telegram.service.ts ${response.accountIdentifier}`)
      // criar sistema de formatação para enviar mensagens complexas
      const sentTgMessage = await AxiosInstance.post(
        `/bot${account.access_token}/sendMessage`,
        TelegramBaseURL,
        {
          chat_id: response.uid,
          text: response.message,
        },
      );
      return sentTgMessage.data;
    } catch (error) {
      console.error('Erro aconteceu tentando enviar mensagem: ', error.data);
      throw error;
    }
  }

  sendErrorResponse({ chat_id, text }): any {
    const sentTgMessage = AxiosInstance.post(`/sendMessage`, TelegramBaseURL, {
      chat_id,
      text,
    });
    console.error('erro ao processar mensagem telegram', chat_id); // Enviar resposta de erro
    return sentTgMessage;
  }
}
