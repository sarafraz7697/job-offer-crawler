import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfigService } from '@libs/config/env';

/**
 * Bootstraps the NestJS application.
 *
 * This asynchronous function initializes the NestJS application by:
 * - Creating the application instance using the root module (`AppModule`).
 * - Applying global validation pipes with transformation enabled.
 * - Setting a global API prefix (`api`) for all routes.
 * - Retrieving the application's configuration service (`EnvConfigService`) to obtain the port.
 * - Starting the application and listening on the configured port.
 *
 * @returns {Promise<void>} A promise that resolves when the application has started.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api');

  const configService = app.get(EnvConfigService);
  await app.listen(configService.getPort());
}
bootstrap();
