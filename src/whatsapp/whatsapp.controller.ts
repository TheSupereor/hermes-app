import { Body, Controller, Post } from "@nestjs/common";
import { WhatsappService } from "./whatsapp.service";
import { NormalizedMessageInterface } from "interfaces/webhook";

// para ser utilizado caso uma mensagem precise ser enviada externamente
@Controller('whatsapp/sendMessage')
export class WhatsappRoutes{
    constructor(
        private readonly wppSrvc: WhatsappService
    ){}

    @Post()
    async handleMessageSend(@Body() payload: NormalizedMessageInterface){
        // como não preciso de mais informações, não preciso fazer transformações
        const resp = this.wppSrvc.sendResponse(payload);
        return resp;
    }
}