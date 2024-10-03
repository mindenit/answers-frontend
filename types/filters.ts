interface Specification<T> {
  satisfies: (item: T) => boolean;
}

interface Filter<T> {
  filter: (items: T[]) => T[];
}

export type { Specification, Filter };
