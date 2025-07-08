import { Injectable } from '@nestjs/common';

@Injectable()
export class JobDeduplicatorService {
  private readonly seen = new Set<string>();

  isDuplicate(id: string): boolean {
    if (this.seen.has(id)) return true;
    this.seen.add(id);
    return false;
  }

  reset(): void {
    this.seen.clear();
  }
}
