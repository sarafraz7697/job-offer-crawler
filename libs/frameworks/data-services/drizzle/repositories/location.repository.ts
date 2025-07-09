import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import { ILocationRepository } from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';
import {
  locations,
  LocationsSchema,
} from '@libs/frameworks/data-services/drizzle/schema';
import * as drizzle from 'drizzle-orm';

@Injectable()
export class LocationRepository
  extends BaseRepository<LocationsSchema>
  implements ILocationRepository
{
  constructor(@Inject(DATA_SERVICE_TOKEN) dataService: IDataservice) {
    super(dataService);
  }

  protected get table() {
    return locations;
  }

  async createOrFindLocation(
    state: string,
    city: string,
  ): Promise<LocationsSchema> {
    const existing = await this.dataService
      .select()
      .from(locations)
      .where(
        drizzle.and(
          drizzle.eq(locations.state, state),
          drizzle.eq(locations.city, city),
        ),
      )
      .limit(1);

    if (existing.length > 0) return existing[0];

    const created = await this.dataService
      .insert(locations)
      .values({ state, city })
      .returning();

    return created[0];
  }
}
