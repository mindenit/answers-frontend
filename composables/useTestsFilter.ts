import type { Specification, Subject, Test } from '~/types';

interface FilterArgs {
  subjectName: Ref<string>;
  courseId: Ref<string>;
  facultyId: Ref<string>;
  subjects: Ref<Subject[] | null>;
}

export const useTestsFilter = ({
  subjectName,
  courseId,
  facultyId,
  subjects,
}: FilterArgs) => {
  const courseSpecification = (courseId: Ref<string>): Specification<Test> => {
    return {
      satisfies: (test) => {
        if (!courseId.value.length) return true;

        return test.courseId === +courseId.value;
      },
    };
  };

  const subjectSpecification = (
    subjectName: Ref<string>
  ): Specification<Test> => {
    return {
      satisfies: (test) => {
        if (!subjectName.value.length) return true;

        if (subjects && subjects.value) {
          const comparableName = subjectName.value.trim().toLowerCase();
          const subject = subjects.value?.find((s) => s.id === test.subjectId);

          return (
            (subject?.name.toLowerCase().includes(comparableName) ||
              subject?.brief.toLowerCase().includes(comparableName)) ??
            false
          );
        }
        return false;
      },
    };
  };

  const facultySpecification = (
    facultyId: Ref<string>
  ): Specification<Test> => {
    return {
      satisfies: (test) => {
        if (!facultyId.value.length) return true;
        return Number(test.facultyId) === Number(facultyId.value);
      },
    };
  };

  const testsSpecifications = multipleSpecifications(
    subjectSpecification(subjectName),
    courseSpecification(courseId),
    facultySpecification(facultyId)
  );

  const testFilter = filterFactory<Test>(testsSpecifications);

  const resetFilters = () => {
    subjectName.value = '';
    courseId.value = '';
    facultyId.value = '';
  };

  const areFiltersApplied = computed(() => {
    return [subjectName, courseId, facultyId].some(
      (filter) => filter.value !== ''
    );
  });

  return { testFilter, resetFilters, areFiltersApplied };
};
