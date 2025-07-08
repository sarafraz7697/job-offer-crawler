import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { validationSchema } from './env.validator';
import { EnvConfigService } from './env.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
