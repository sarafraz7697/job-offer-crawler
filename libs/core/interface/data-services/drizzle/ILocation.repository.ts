import { LocationsSchema } from '@libs/frameworks/data-services/drizzle/schema';
import { IBaseRepository } from './IBase.repository';

export const LOCATION_REPOSITORY_TOKEN = Symbol('LOCATION_REPOSITORY_TOKEN');

/**
 * Repository interface for managing location entities.
 * Extends the base repository with additional functionality specific to locations.
 *
 * @interface ILocationRepository
 * @extends IBaseRepository<LocationsSchema>
 */

/**
 * Creates a new location or finds an existing one based on the provided state, city, and remote flag.
 *
 * @param state - The state where the location is situated.
 * @param city - The city where the location is situated.
 * @param remote - Indicates if the location is remote.
 * @returns A promise that resolves to the found or newly created location entity.
 */
export interface ILocationRepository extends IBaseRepository<LocationsSchema> {
  createOrFindLocation(
    state: string,
    city: string,
    remote: boolean,
  ): Promise<LocationsSchema>;
}
