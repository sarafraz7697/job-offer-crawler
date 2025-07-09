import { companies } from '../schema';
import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private dataService: IDataservice,
  ) {}
}
