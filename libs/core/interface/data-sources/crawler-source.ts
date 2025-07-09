import { UnifiedJobDto } from '@libs/dtos';

export interface ICrawlerSource {
  fetch(): Promise<unknown>;
  toUnified(raw: unknown): UnifiedJobDto[];
}
