import { GetJobOffersUseCase } from './get-job-offers.use-case';
import { IJobRepository } from '@libs/core/interface/data-services/drizzle';

describe('GetJobOffersUseCase', () => {
  let useCase: GetJobOffersUseCase;
  const mockRepo: IJobRepository = {
    findFilteredJobs: jest.fn().mockResolvedValue([]),
    countFilteredJobs: jest.fn().mockResolvedValue(0),
  } as any;

  beforeEach(() => {
    useCase = new GetJobOffersUseCase(mockRepo);
  });

  it('should return paginated result', async () => {
    const result = await useCase.execute({ page: 1, limit: 10 });
    expect(result.meta.total).toBe(0);
    expect(result.data).toEqual([]);
  });
});
