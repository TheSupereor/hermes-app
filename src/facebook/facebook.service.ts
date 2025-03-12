import { Injectable } from '@nestjs/common';
import { FacebookSendMessageResponse } from 'interfaces/facebook';
import AxiosInstance from 'src/commom/Axios/axios';
import { BusinessAccountRepository } from 'src/database/repositories/business-accounts.repository';

const FacebookBaseURL = `https://graph.facebook.com/v22.0`;

@Injectable()
export class FacebookService {
  constructor(private readonly busAccRepo: BusinessAccountRepository) {}

  async sendResponse(response: any): Promise<FacebookSendMessageResponse> {
    try {
      // To Do formatação para mensagens complexas
      const account = await this.busAccRepo.getBusinessAccountsByIdentifier(
        response.accountIdentifier,
      );
      if (!account)
        throw new Error(
          `Conta não encontrada no Banco de Dados - Facebook.service.ts ${response.accountIdentifier}`,
        );
      const sentFbMessage = await AxiosInstance.post(
        `/${response.accountIdentifier}/messages?access_token=${account.access_token}`,
        FacebookBaseURL,
        {
          recipient: {
            id: response.uid,
          },
          messaging_type: 'RESPONSE',
          message: {
            text: response.message,
          },
        },
      );
      return sentFbMessage.data;
    } catch (error) {
      console.error('Erro aconteceu tentando enviar mensagem: ', error);
      throw error;
    }
  }

  sendErrorResponse({ chat_id, text }): any {
    const sentFbMessage = AxiosInstance.post(`/sendMessage`, FacebookBaseURL, {
      chat_id,
      text,
    });
    console.error('erro ao processar mensagem facebook', chat_id); // Enviar resposta de erro
    return sentFbMessage;
  }
}
