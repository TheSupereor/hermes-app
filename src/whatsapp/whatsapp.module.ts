import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappRoutes } from './whatsapp.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [
        WhatsappRoutes,
    ],
    providers: [
        WhatsappService,
    ],
    exports: [
        WhatsappService,
    ]
})
export class WhatsappModule {}
