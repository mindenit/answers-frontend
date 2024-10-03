import type { Query } from '~/types/searchQuery';

const stringifyQuery = (query: Query): string => {
  if (Array.isArray(query)) return '';

  if (typeof query === 'number') return query.toString();

  return query;
};

export { stringifyQuery };
