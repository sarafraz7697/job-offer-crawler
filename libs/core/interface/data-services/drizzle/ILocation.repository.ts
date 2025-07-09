import { LocationsSchema } from '@libs/frameworks/data-services/drizzle/schema';
import { IBaseRepository } from './IBase.repository';

export const LOCATION_REPOSITORY_TOKEN = Symbol('LOCATION_REPOSITORY_TOKEN');

export interface ILocationRepository extends IBaseRepository<LocationsSchema> {
  createOrFindLocation(
    state: string,
    city: string,
    remote: boolean,
  ): Promise<LocationsSchema>;
}
