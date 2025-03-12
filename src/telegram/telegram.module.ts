import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramRoutes } from './telegram.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [
        TelegramRoutes,
    ],
    providers: [
        TelegramService,
    ],
    exports: [
        TelegramService,
    ],
    imports: [
        DatabaseModule
    ]
    
})
export class TelegramModule {}
