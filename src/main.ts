import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './commom/middleware/logger.middeware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
