import type {HasId} from "../domain/types.ts";
import type {IRepository} from "./interfaces.ts";

export class LocalStorage<T extends HasId> implements IRepository<T> {
  constructor(private readonly storageKey: string) {
  }

  // Kludge to bypass synchro method's of localStorage and testing
  private async delay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 50));
  }

  private readData(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private writeData(data: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getAll(): Promise<T[]> {
    await this.delay();
    return this.readData();
  }

  async getById(id: T['id']): Promise<T | null> {
    await this.delay();
    const items = this.readData();
    return items.find(i => i.id === id) || null;
  }

  async create(item: T): Promise<T> {
    await this.delay();
    const items = this.readData();
    if (items.some(i => i.id === item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }
    items.push(item);
    this.writeData(items);
    return item;
  }

  async update(item: T): Promise<T> {
    await this.delay();
    const items = this.readData();
    const index = items.findIndex(i => i.id === item.id);
    if (index === -1) {
      throw new Error(`Item with id ${item.id} not found`);
    }
    items[index] = item;
    this.writeData(items);
    return item;
  }

  async delete(id: T['id']): Promise<boolean> {
    await this.delay();
    const items = this.readData();
    const filteredItems = items.filter(i => i.id === id);
    if (items.length === filteredItems.length) return false;

    this.writeData(items);
    return true;
  }
}