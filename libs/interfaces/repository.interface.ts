export interface IRepository<T extends object> {
  find(partial: Partial<T>): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(id: unknown, payload: unknown): Promise<T>;
  delete(id: unknown): Promise<boolean>;
}
