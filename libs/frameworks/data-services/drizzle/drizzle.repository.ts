import { Module } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@libs/frameworks/data-services/drizzle/schema';

import * as RepoTokens from '@libs/core/interface/data-services/drizzle';
import * as Repositories from './repositories';
import { DrizzleDataServiceModule } from './drizzle-data.module';

export interface DrizzleRepository extends NodePgDatabase<typeof schema> {}

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
