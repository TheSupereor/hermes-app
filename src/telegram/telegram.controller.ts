import { Body, Controller, Post } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { NormalizedMessageInterface } from "interfaces/webhook";


@Controller('telegram/sendMessage')
export class TelegramRoutes{
    constructor(
        private readonly tlgSrvc: TelegramService
    ){}

    @Post()
    async handleMessageSend(@Body() payload: NormalizedMessageInterface){
        // como não preciso de mais informações, não preciso fazer transformações
        const resp = this.tlgSrvc.sendResponse(payload);
        return resp;
    }
}