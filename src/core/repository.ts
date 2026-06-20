import type {CourseID, HasId, UserID} from "./types.ts";

export class Repository<T extends HasId> {
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