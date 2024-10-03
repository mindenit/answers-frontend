import type { Filter, Specification } from '~/types/filters';

const multipleSpecifications = <T>(
  ...specifications: Specification<T>[]
): Specification<T> => {
  return {
    satisfies: (test) => specifications.every((spec) => spec.satisfies(test)),
  };
};

const filterFactory = <T>(spec: Specification<T>): Filter<T> => {
  return {
    filter: (items) => items.filter(spec.satisfies),
  };
};

export { multipleSpecifications, filterFactory };
