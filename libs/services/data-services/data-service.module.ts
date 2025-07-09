import { DynamicModule, Module } from '@nestjs/common';
import { DataServiceType } from '@libs/core/frameworks/data-services';
import { RedisCacheServiceModule } from '@libs/frameworks/data-services/redis';
import { DrizzleDataServiceModule } from '@libs/frameworks/data-services/drizzle';

@Module({
  imports: [RedisCacheServiceModule],
  exports: [RedisCacheServiceModule],
})
export class DataServiceModule {
  static forRoot(
    db: DataServiceType = DataServiceType.POSTGRESQL,
  ): DynamicModule {
    return {
      module: DataServiceModule,
      imports:
        db === DataServiceType.POSTGRESQL
          ? [DrizzleDataServiceModule]
          : [
              /** Other DataServiceModule */
            ],
      exports:
        db === DataServiceType.POSTGRESQL
          ? [DrizzleDataServiceModule]
          : [
              /** Other DataServiceModule */
            ],
    };
  }
}
