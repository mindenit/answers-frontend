type Mapper<T, U> = (value: T) => U;
type Action<T> = Mapper<T, T>;
type Callback<T> = Mapper<T, void>;

export * from './api';
export * from './editor';
export * from './filters';
export type { Action, Callback };

