export interface Repository<T extends { id: number }> {
    getAll(): T[];
    getById(id: number): T | undefined;
    add(item: T): void;
    update(item: T): void;
    remove(id: number): void;
}
