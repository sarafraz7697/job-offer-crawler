import { eq } from 'drizzle-orm';
import { IDataservice } from '@libs/core/interface/services';
import { IBaseRepository } from '@libs/core/interface/data-services/drizzle';

/**
 * Abstract base repository class providing common CRUD operations for a data model.
 *
 * @typeParam TModel - The type of the data model managed by the repository.
 *
 * @remarks
 * This class implements the `IBaseRepository` interface and provides generic
 * methods for creating, finding, updating, and deleting records using a data service.
 * Concrete subclasses must provide the `table` property representing the database table.
 *
 * @example
 * class UserRepository extends BaseRepository<User> {
 *   protected get table() {
 *     return usersTable;
 *   }
 * }
 *
 * @param dataService - The data service instance used for database operations.
 */
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
