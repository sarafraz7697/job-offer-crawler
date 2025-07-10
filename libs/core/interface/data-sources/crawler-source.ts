import { UnifiedJobDto } from '@libs/dtos';

/**
 * Represents a data source for a crawler that can fetch raw data and convert it to a unified format.
 *
 * @interface ICrawlerSource
 */
export interface ICrawlerSource {
  fetch(): Promise<unknown>;
  toUnified(raw: unknown): UnifiedJobDto[];
}
