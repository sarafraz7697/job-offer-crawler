import { DynamicModule, Module } from '@nestjs/common';
import { DataServiceType } from '@libs/core/frameworks/data-services';
import { RedisCacheServiceModule } from '@libs/frameworks/data-services/redis';
import { DrizzleDataServiceModule } from '@libs/frameworks/data-services/drizzle';

/**
 * The `DataServiceModule` is a dynamic NestJS module that provides data service integration.
 * It imports and exports the `RedisCacheServiceModule` by default.
 *
 * @module DataServiceModule
 */

/**
 * Dynamically configures and returns a `DynamicModule` based on the specified `DataServiceType`.
 *
 * @param db - The type of data service to use. Defaults to `DataServiceType.POSTGRESQL`.
 * @returns A `DynamicModule` configured with the appropriate data service module(s).
 */
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
