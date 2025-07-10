/**
 * Generic base repository interface for data access operations.
 *
 * @template TModel - The type of the model managed by the repository.
 */
export interface IBaseRepository<TModel> {
  create(data: TModel): Promise<void>;
  findById(id: string): Promise<TModel | null>;
  findAll(): Promise<TModel[]>;
  update(id: string, data: Partial<TModel>): Promise<void>;
  delete(id: string): Promise<void>;
}
