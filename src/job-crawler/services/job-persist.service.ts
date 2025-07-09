import * as drizzle from 'drizzle-orm';
import { Inject } from '@nestjs/common';
import { v4 as generateUuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { jobs } from '@drizzle-schema/index';
import { companies } from '@drizzle-schema/companies';
import { locations } from '@drizzle-schema/locations';
import { DrizzleDataService } from '@libs/frameworks/data-services/drizzle';
import { DRIZZLE_DATA_SERVICE } from '@libs/constants/frameworks/data-services';
import { UnifiedJobDto } from '@libs/dtos';

@Injectable()
export class JobPersistService {
  constructor(
    @Inject(DRIZZLE_DATA_SERVICE)
    private readonly drizzle: DrizzleDataService,
  ) {}

  async save(job: UnifiedJobDto): Promise<void> {
    try {
      const companyId = await this.ensureCompany(job.company);
      const locationId = await this.ensureLocation(job.location);

      await this.drizzle.db
        .insert(jobs)
        .values({
          id: job.id,
          title: job.title,
          companyId,
          locationId,
          type: job.type ?? null,
          salaryMin: job.salary.min,
          salaryMax: job.salary.max,
          currency: job.salary.currency,
          experience: job.experience ?? 0,
          postedDate: job.postedDate,
        })
        .onConflictDoNothing();
    } catch (err) {
      console.error(`Failed to save job ${job.id}:`, err);
    }
  }

  private async ensureCompany(company: {
    name: string;
    industry?: string;
  }): Promise<string> {
    const existing = await this.drizzle.db
      .select()
      .from(companies)
      .where(drizzle.eq(companies.name, company.name))
      .limit(1);

    if (existing.length) return existing[0].id;

    const id = generateUuid();
    await this.drizzle.db.insert(companies).values({
      id,
      name: company.name,
      industry: company.industry ?? null,
    });
    return id;
  }

  private async ensureLocation(location: {
    city: string;
    state: string;
    remote: boolean;
  }): Promise<string> {
    const existing = await this.drizzle.db
      .select()
      .from(locations)
      .where(
        drizzle.and(
          drizzle.eq(locations.state, location.state),
          drizzle.eq(locations.city, location.city),
        ),
      )
      .limit(1);

    if (existing.length) return existing[0].id;

    const id = generateUuid();
    await this.drizzle.db.insert(locations).values({
      id,
      city: location.city,
      state: location.state,
      remote: location.remote,
    });
    return id;
  }
}
