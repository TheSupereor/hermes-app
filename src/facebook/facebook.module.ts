import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookRoutes } from './facebook.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [
        FacebookRoutes,
    ],
    providers: [
        FacebookService,
    ],
    exports: [
        FacebookService,
    ]
})
export class FacebookModule {}
