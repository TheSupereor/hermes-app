import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramRoutes } from './telegram.controller';

@Module({
    controllers: [
        TelegramRoutes,
    ],
    providers: [
        TelegramService,
    ],
    exports: [
        TelegramService,
    ]
})
export class TelegramModule {}
