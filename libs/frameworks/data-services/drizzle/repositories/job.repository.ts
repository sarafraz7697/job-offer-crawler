import { jobs } from '../schema/jobs';
import { Inject, Injectable } from '@nestjs/common';
import { IJobRepository } from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';

@Injectable()
export class JobRepository implements IJobRepository {
  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private dataService: IDataservice,
  ) {}
}
