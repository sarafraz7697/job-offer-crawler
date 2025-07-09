import { Controller, Get, Query } from '@nestjs/common';
import { GetJobOffersUseCase } from '@job-crawler/use-cases';
import { JobFilterDto } from '@libs/dtos/unified/job-filter.dto';

@Controller('/job-offers')
export class AppController {
  constructor(private readonly getJobsUseCase: GetJobOffersUseCase) {}

  @Get()
  async getJobOffers(@Query() filters: JobFilterDto) {
    return this.getJobsUseCase.execute(filters);
  }
}
