<script lang="ts" setup>
import {
  Heading,
  Pagination,
  SearchField,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
} from '@mindenit/ui';
import { PAGE_SIZE } from '~/constants';
import type { Course, Faculty, Test } from '~/types';

useSeoMeta({
  title: 'Каталог | Answers',
});

const { find } = useStrapi();

const currentPage = ref(1);

const { data: courses, status: coursesStatus } = await useAsyncData(
  'courses',
  () => find<Course>('courses'),
  { lazy: true },
);

const { data: faculties, status: facultiesStatus } = await useAsyncData(
  'faculties',
  () => find<Faculty>('faculties'),
  { lazy: true },
);

const { data: tests, status: testsStatus } = await useAsyncData(
  'verified-tests',
  () =>
    find<Test>('tests', {
      populate: ['subject', 'course', 'faculties'],
      pagination: {
        page: currentPage.value,
        pageSize: PAGE_SIZE,
      },
      sort: ['createdAt:desc'],
      filters: {
        verified: { $eq: true },
      },
    }),
  {
    watch: [currentPage],
  },
);

const subjectName = ref('');
const courseNumber = ref('');
const facultyName = ref('');

const { testFilter, resetFilters, areFiltersApplied } = useTestsFilter({
  subjectName,
  courseNumber,
  facultyName,
});

const filteredTest = computed(() => {
  if (!tests.value?.data) return [];

  return testFilter.filter(tests.value.data);
});
</script>
<template>
  <div class="container mx-auto">
    <div
      class="flex md:flex-row flex-col md:items-stretch w-full items-center gap-2 mb-3"
    >
      <SearchField
        class="w-full"
        v-model="subjectName"
        placeholder="Введіть предмет..."
        autofocus
      />
      <SelectRoot v-model="courseNumber">
        <SelectTrigger
          class="w-full sm:w-[200px]"
          placeholder="Виберіть курс"
        />
        <SelectContent class="">
          <template v-if="courses?.data.length">
            <SelectItem
              v-for="({ attributes: course }, index) in courses.data"
              :key="index"
              :value="course.number.toString()"
            >
              {{ course.number }} курс
            </SelectItem>
          </template>
          <span v-else class="p-3 text-center">
            <Text
              v-show="!courses?.data.length"
              size="subtitle"
              class="select-none"
              >Курси відсутні</Text
            >
            <Icon
              v-show="coursesStatus === 'pending'"
              name="svg-spinners:180-ring"
              class="size-5"
            />
          </span>
        </SelectContent>
      </SelectRoot>

      <SelectRoot v-model="facultyName">
        <SelectTrigger
          class="w-full sm:w-[200px]"
          placeholder="Виберіть факультет"
        />
        <SelectContent>
          <template v-if="faculties?.data.length">
            <SelectItem
              v-for="({ attributes: faculty }, index) in faculties.data"
              :key="index"
              :value="faculty.name"
            >
              {{ faculty.name }}
            </SelectItem>
          </template>
          <span v-else class="p-3 text-center">
            <Text
              v-show="!faculties?.data.length"
              size="subtitle"
              class="select-none"
              >Факультети відсутні</Text
            >
            <Icon
              v-show="facultiesStatus === 'pending'"
              name="svg-spinners:180-ring"
              class="size-5"
            />
          </span>
        </SelectContent>
      </SelectRoot>
    </div>
    <button
      v-if="areFiltersApplied"
      class="inline-flex mb-3 text-fiord-400 items-center justify-start hover:text-royal-blue-500 gap-1 text-sm"
      @click="resetFilters"
    >
      <Icon class="size-5" name="ph:x-circle-fill" />
      Скинути фільтри
    </button>
    <div v-if="filteredTest.length" class="flex flex-col gap-y-3">
      <TestCard
        v-for="{ id, attributes: test } in filteredTest"
        :key="id"
        :id
        :test
      />
    </div>
    <FallbackCard v-if="testsStatus === 'pending'">
      <Icon class="size-10" name="svg-spinners:180-ring" />
    </FallbackCard>
    <FallbackCard v-if="tests?.data.length && !filteredTest.length">
      <Icon class="size-10" name="ph:info" />
      <Heading size="tiny">Тестів за вашим запитом не знайдено</Heading>
    </FallbackCard>
    <FallbackCard v-if="!tests?.data.length">
      <Icon class="size-10" name="ph:info" />
      <Heading size="tiny">Нажаль, тестів ще немає</Heading>
    </FallbackCard>
    <div
      v-if="getPagesCount(tests?.meta.pagination.total) > 1"
      class="inline-flex w-full items-center justify-center mt-4"
    >
      <Pagination
        v-model:page="currentPage"
        :items-per-page="PAGE_SIZE"
        :total="tests?.meta.pagination.total"
      />
    </div>
  </div>
</template>
