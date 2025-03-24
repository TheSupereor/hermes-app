import { Injectable } from '@nestjs/common';
import { WhatsappSendMessageResponse } from 'interfaces/whatsapp';
import AxiosInstance from 'src/commom/Axios/axios';
import { BusinessAccountRepository } from 'src/database/repositories/business-accounts.repository';

const WhatsappBaseURL = `https://graph.facebook.com/v22.0`;

@Injectable()
export class WhatsappService {
  constructor(private readonly busAccRepo: BusinessAccountRepository) {}

  async sendResponse(response: any): Promise<WhatsappSendMessageResponse> {
    try {
      // To Do formatação para mensagens complexas
      const account = await this.busAccRepo.getBusinessAccountsByIdentifier(
        response.accountIdentifier,
      );
      if (!account)
        throw new Error(
          `Conta não encontrada no Banco de Dados - Whatsapp.service.ts ${response.accountIdentifier}`,
        );
      const sentFbMessage = await AxiosInstance.post(
        `/${response.accountIdentifier}/messages`,
        WhatsappBaseURL,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: response.uid,
          type: 'text',
          text: {
            preview_url: false,
            body: response.message,
          },
        },
        {
          headers: {
            Authorization: account.access_token,
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
    const sentFbMessage = AxiosInstance.post(`/sendMessage`, WhatsappBaseURL, {
      chat_id,
      text,
    });
    console.error('erro ao processar mensagem facebook', chat_id); // Enviar resposta de erro
    return sentFbMessage;
  }
}
