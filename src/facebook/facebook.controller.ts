import { Body, Controller, Post } from "@nestjs/common";
import { FacebookService } from "./facebook.service";
import { NormalizedMessageInterface } from "interfaces/webhook";

// para ser utilizado caso uma mensagem precise ser enviada externamente
@Controller('facebook/sendMessage')
export class FacebookRoutes{
    constructor(
        private readonly fbSrvc: FacebookService
    ){}

    @Post()
    async handleMessageSend(@Body() payload: NormalizedMessageInterface){
        // como não preciso de mais informações, não preciso fazer transformações
        const resp = this.fbSrvc.sendResponse(payload);
        return resp;
    }
}