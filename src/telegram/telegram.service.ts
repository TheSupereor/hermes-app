import { Injectable } from "@nestjs/common";


@Injectable()
export class TelegramService{
    sendResponse(response: any): void {
        console.log('resposta', response)                             // enviar resposta comum
    }

    sendErrorResponse(error: any): void {
        console.error('erro ao processar mensagem instagram', error); // Enviar resposta de erro
    }
}