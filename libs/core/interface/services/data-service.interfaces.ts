import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DataServiceType } from '@libs/core/frameworks/data-services';
import * as schema from '@libs/frameworks/data-services/drizzle/schema';

export const DATA_SERVICE_TOKEN = Symbol('DATA_SERVICE_TOKEN');

type RepositoryMapByDb = {
  [DataServiceType.POSTGRESQL]: DrizzleRepository;
  //   [Other DataService Types]:  xRepository;
};

export type IDataservice<
  T extends DataServiceType = DataServiceType.POSTGRESQL,
> = RepositoryMapByDb[T];

export interface DrizzleRepository extends NodePgDatabase<typeof schema> {}
