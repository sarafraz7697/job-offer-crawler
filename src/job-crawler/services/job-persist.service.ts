import { UnifiedJobDto } from '@libs/dtos';
import { Inject, Injectable, Logger } from '@nestjs/common';
import * as RepoTokens from '@libs/core/interface/data-services/drizzle';
import * as Repositories from '@libs/frameworks/data-services/drizzle/repositories';

@Injectable()
export class JobPersistService {
  private readonly logger = new Logger(JobPersistService.name);

  constructor(
    @Inject(RepoTokens.SKILL_REPOSITORY_TOKEN)
    private readonly skillRepository: Repositories.SkillRepository,

    @Inject(RepoTokens.COMPANY_REPOSITORY_TOKEN)
    private readonly companyRepository: Repositories.CompaniesRepository,

    @Inject(RepoTokens.JOB_REPOSITORY_TOKEN)
    private readonly jobRepository: Repositories.JobRepository,

    @Inject(RepoTokens.JOB_SKILL_REPOSITORY_TOKEN)
    private readonly jobSkillRepository: Repositories.JobSkillRepository,

    @Inject(RepoTokens.LOCATION_REPOSITORY_TOKEN)
    private readonly locationRepository: Repositories.LocationRepository,
  ) {}

  async process(job: UnifiedJobDto): Promise<void> {
    const { company, skills, location } = job;

    let companyRecord = await this.companyRepository.findByName(company.name);
    if (!companyRecord) {
      companyRecord = await this.companyRepository.createAndReturn(company);
    }

    const locationRecord = await this.locationRepository.createOrFindLocation(
      location.state,
      location.city,
    );

    const skillIds: number[] = [];
    for (const skill of skills) {
      let skillRecord = await this.skillRepository.findByName(skill);
      if (!skillRecord) {
        skillRecord = await this.skillRepository.createAndReturn({
          name: skill,
        });
      }
      skillIds.push(skillRecord.id);
    }

    const duplicate = await this.jobRepository.findDuplicate({
      title: job.title,
      companyId: companyRecord.id,
      locationId: locationRecord.id,
    });
    if (duplicate) {
      this.logger.warn(
        `Duplicate job detected: ${job.title} at ${company.name}`,
      );
      return;
    }

    const jobCreated = await this.jobRepository.createAndReturn({
      title: job.title,
      locationId: locationRecord.id,
      companyId: companyRecord.id,
      type: job.type,
      remote: job.remote,
      salaryMin: job.salary.min,
      salaryMax: job.salary.max,
      currency: job.salary.currency,
      experience: job.experience,
      postedDate: job.postedDate,
    });

    for (const skillId of skillIds) {
      await this.jobSkillRepository.linkJobSkill(jobCreated.id, skillId);
    }

    this.logger.log(`Job persisted: ${job.title} at ${company.name}`);
  }
}
