import { DataServiceType } from '@libs/core/frameworks/data-services';
import { DrizzleRepository } from '@libs/frameworks/data-services/drizzle';

export const DATA_SERVICE_TOKEN = Symbol('DATA_SERVICE_TOKEN');

/**
 * Maps each supported {@link DataServiceType} to its corresponding repository implementation.
 *
 * @remarks
 * Extend this type by adding additional properties for other {@link DataServiceType} values,
 * mapping them to their respective repository types (e.g., MongoRepository, MySqlRepository).
 *
 * @example
 * ```typescript
 * const repoMap: RepositoryMapByDb = {
 *   [DataServiceType.POSTGRESQL]: drizzleRepoInstance,
 *   // [DataServiceType.MONGODB]: mongoRepoInstance,
 * };
 * ```
 */
type RepositoryMapByDb = {
  [DataServiceType.POSTGRESQL]: DrizzleRepository;
  //   [Other DataService Types]:  xRepository;
};

export type IDataservice<
  T extends DataServiceType = DataServiceType.POSTGRESQL,
> = RepositoryMapByDb[T];
