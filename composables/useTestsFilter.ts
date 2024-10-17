import type { Strapi4ResponseData } from '@nuxtjs/strapi';
import type { Specification, Test } from '~/types';

interface FilterArgs {
  subjectName: Ref<string>;
  courseNumber: Ref<string>;
  facultyName: Ref<string>;
}

export const useTestsFilter = ({
  subjectName,
  courseNumber,
  facultyName,
}: FilterArgs) => {
  const courseSpecification = (
    courseNumber: Ref<string>
  ): Specification<Strapi4ResponseData<Test>> => {
    return {
      satisfies: (test) => {
        if (!courseNumber.value.length) return true;

        return (
          test.attributes.course.data.attributes.number === +courseNumber.value
        );
      },
    };
  };

  const subjectSpecification = (
    subjectName: Ref<string>
  ): Specification<Strapi4ResponseData<Test>> => {
    return {
      satisfies: (test) => {
        if (!subjectName.value.length) return true;

        const comparableName = subjectName.value.trim().toLowerCase();

        return (
          test.attributes.subject.data.attributes.brief
            .toLowerCase()
            .includes(comparableName) ||
          test.attributes.subject.data.attributes.name
            .trim()
            .toLowerCase()
            .includes(comparableName)
        );
      },
    };
  };

  const facultySpecification = (
    facultyName: Ref<string>
  ): Specification<Strapi4ResponseData<Test>> => {
    return {
      satisfies: (test) => {
        if (!facultyName.value.length) return true;

        return test.attributes.faculties.data.some(
          (faculty) => faculty.attributes.name === facultyName.value
        );
      },
    };
  };

  const testsSpecifications = multipleSpecifications(
    subjectSpecification(subjectName),
    courseSpecification(courseNumber),
    facultySpecification(facultyName)
  );

  const testFilter =
    filterFactory<Strapi4ResponseData<Test>>(testsSpecifications);

  const resetFilters = () => {
    subjectName.value = '';
    courseNumber.value = '';
    facultyName.value = '';
  };

  const areFiltersApplied = computed(() => {
    return [subjectName, courseNumber, facultyName].some(
      (filter) => filter.value !== ''
    );
  });

  return { testFilter, resetFilters, areFiltersApplied };
};
