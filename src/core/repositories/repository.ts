import type {CourseID, HasId, UserID} from "../domain/types.ts";

export interface IRepository<T extends HasId> {
  add(item: T): void;
  getAll(): Promise<T[]>;
  delete(id: UserID | CourseID): Promise<T[]>;
}

export interface IStudentDTO extends HasId {

}

export interface ICourseDTO extends HasId {

}

export class Repository<T extends HasId> implements IRepository<T> {
  #items: T[] = [];

  add(item: T): void {
    // TODO Uniq ID check
    this.#items.push(item);
  }

  getAll(): T[] {
    return [...this.#items]
  }

  // think about ID universal for this check
  delete(id: UserID | CourseID): boolean {}
}