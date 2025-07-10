import { Module } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@libs/frameworks/data-services/drizzle/schema';

import * as RepoTokens from '@libs/core/interface/data-services/drizzle';
import * as Repositories from './repositories';
import { DrizzleDataServiceModule } from './drizzle-data.module';

export interface DrizzleRepository extends NodePgDatabase<typeof schema> {}

/**
 * NestJS module that provides repository implementations using Drizzle ORM.
 *
 * This module imports the `DrizzleDataServiceModule` and registers repository providers
 * for jobs, companies, job skills, locations, and skills. Each repository is associated
 * with a specific injection token defined in `RepoTokens`, and the corresponding
 * repository class from `Repositories` is used as the implementation.
 *
 * The module also exports these repository tokens, making them available for injection
 * in other modules that import `DrizzleRepositoriesModule`.
 *
 * @module DrizzleRepositoriesModule
 * @see DrizzleDataServiceModule
 * @see RepoTokens
 * @see Repositories
 */
@Module({
  imports: [DrizzleDataServiceModule],
  providers: [
    {
      provide: RepoTokens.JOB_REPOSITORY_TOKEN,
      useClass: Repositories.JobRepository,
    },
    {
      provide: RepoTokens.COMPANY_REPOSITORY_TOKEN,
      useClass: Repositories.CompaniesRepository,
    },
    {
      provide: RepoTokens.JOB_SKILL_REPOSITORY_TOKEN,
      useClass: Repositories.JobSkillRepository,
    },
    {
      provide: RepoTokens.LOCATION_REPOSITORY_TOKEN,
      useClass: Repositories.LocationRepository,
    },
    {
      provide: RepoTokens.SKILL_REPOSITORY_TOKEN,
      useClass: Repositories.SkillRepository,
    },
  ],
  exports: [
    RepoTokens.JOB_REPOSITORY_TOKEN,
    RepoTokens.COMPANY_REPOSITORY_TOKEN,
    RepoTokens.JOB_SKILL_REPOSITORY_TOKEN,
    RepoTokens.LOCATION_REPOSITORY_TOKEN,
    RepoTokens.SKILL_REPOSITORY_TOKEN,
  ],
})
export class DrizzleRepositoriesModule {}
