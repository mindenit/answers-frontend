type Mapper<T, U> = (value: T) => U;
type Action<T> = Mapper<T, T>;
type Callback<T> = Mapper<T, void>;

export * from './editor';
export * from './filters';
export * from './strapi';
export type { Action, Callback };
