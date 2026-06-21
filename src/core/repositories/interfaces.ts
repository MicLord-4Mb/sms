import type { HasId } from "../domain/types.ts";

export interface IRepository<T extends HasId> {
  getById(id: T['id']): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: T['id']): Promise<boolean>;
}
