import { eq } from 'drizzle-orm';
import { IDataservice } from '@libs/core/interface/services';
import { IBaseRepository } from '@libs/core/interface/data-services/drizzle';

export abstract class BaseRepository<TModel>
  implements IBaseRepository<TModel>
{
  constructor(protected readonly dataService: IDataservice) {}

  protected abstract get table(): any;

  async create(data: TModel): Promise<void> {
    await this.dataService.insert(this.table).values(data as any);
  }

  async findById(id: string): Promise<TModel | null> {
    const result = await this.dataService
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));
    return result[0] ?? null;
  }

  async findAll(): Promise<TModel[]> {
    return this.dataService.select().from(this.table);
  }

  async update(id: string, data: Partial<TModel>): Promise<void> {
    await this.dataService
      .update(this.table)
      .set(data as any)
      .where(eq(this.table.id, id));
  }

  async delete(id: string): Promise<void> {
    await this.dataService.delete(this.table).where(eq(this.table.id, id));
  }
}
