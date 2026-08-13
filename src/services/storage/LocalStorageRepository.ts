import type { Repository } from "../../interfaces/Repository";

export class LocalStorageRepository<T extends { id: number }> implements Repository<T> {
    private readonly storageKey: string;
    private readonly serialize: (item: T) => unknown;
    private readonly deserialize: (raw: unknown) => T;
    private items: T[];

    constructor(
        storageKey: string,
        serialize: (item: T) => unknown,
        deserialize: (raw: unknown) => T
    ) {
        this.storageKey = storageKey;
        this.serialize = serialize;
        this.deserialize = deserialize;
        this.items = this.load();
    }

    private load(): T[] {
        if (typeof localStorage === "undefined") {
            return [];
        }

        const raw = localStorage.getItem(this.storageKey);
        if (!raw) {
            return [];
        }

        try {
            const parsed = JSON.parse(raw) as unknown[];
            return parsed.map(item => this.deserialize(item));
        } catch {
            return [];
        }
    }

    private persist(): void {
        if (typeof localStorage === "undefined") {
            return;
        }

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.items.map(item => this.serialize(item)))
        );
    }

    getAll(): T[] {
        return [...this.items];
    }

    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: T): void {
        this.items.push(item);
        this.persist();
    }

    update(item: T): void {
        this.items = this.items.map(existing => existing.id === item.id ? item : existing);
        this.persist();
    }

    remove(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
        this.persist();
    }

    clear(): void {
        this.items = [];
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(this.storageKey);
        }
    }
}
