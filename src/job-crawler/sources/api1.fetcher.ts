import { Effect, Schedule } from 'effect';
import { Injectable } from '@nestjs/common';
import { UnifiedJobDto } from '@job-crawler/dtos';
import { JobMapperService } from '@job-crawler/services';

@Injectable()
export class Api1Fetcher {
  constructor(private readonly mapper: JobMapperService) {}

  fetch(): Promise<UnifiedJobDto[]> {
    const fetchEffect = Effect.tryPromise({
      try: () => fetch('https://assignment.devotel.io/api/provider1/jobs'),
      catch: (err) => new Error(`Fetch failed: ${String(err)}`),
    }).pipe(
      Effect.flatMap((res) =>
        Effect.tryPromise({
          try: () => res.json(),
          catch: (err) => new Error(`JSON parse failed: ${String(err)}`),
        }),
      ),
      Effect.map((data: any) => {
        if (!data.jobs || !Array.isArray(data.jobs)) {
          throw new Error('Invalid response format');
        }
        return data.jobs.map((raw: any) => this.mapper.fromApi1(raw));
      }),
      Effect.timeout('3 seconds'),
      Effect.retry({
        schedule: Schedule.exponential(1000),
        times: 3,
      }),

      Effect.catchAll((err) => {
        console.error('Api1Fetcher failed:', err);
        return Effect.succeed([]);
      }),
    );

    return Effect.runPromise(fetchEffect);
  }
}
