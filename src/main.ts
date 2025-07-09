import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfigService } from '@libs/config/env';
import { JobTypes } from '@libs/core/frameworks/data-services/drizzle/job';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  const configService = app.get(EnvConfigService);
  await app.listen(configService.getPort());
}
bootstrap();
