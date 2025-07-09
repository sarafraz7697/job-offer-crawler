import { DataServiceType } from '@libs/core/frameworks/data-services';
import { DrizzleRepository } from '@libs/frameworks/data-services/drizzle';

export const DATA_SERVICE_TOKEN = Symbol('DATA_SERVICE_TOKEN');

type RepositoryMapByDb = {
  [DataServiceType.POSTGRESQL]: DrizzleRepository;
  //   [Other DataService Types]:  xRepository;
};

export type IDataservice<
  T extends DataServiceType = DataServiceType.POSTGRESQL,
> = RepositoryMapByDb[T];
