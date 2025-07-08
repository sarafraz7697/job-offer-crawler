import { Global, Module } from '@nestjs/common';
import { DrizzleDataService } from './drizzle-data.service';
import { EnvConfigModule } from '@libs/config/env/env.module';
import { DRIZZLE_DATA_SERVICE } from '@libs/constants/frameworks/data-services';

@Global()
@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: DRIZZLE_DATA_SERVICE,
      useClass: DrizzleDataService,
    },
  ],
  exports: [DRIZZLE_DATA_SERVICE],
})
export class DrizzleDataServiceModule {}
