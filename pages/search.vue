<script lang="ts" setup>
import { Heading, SearchField } from '@mindenit/ui';
import { PAGE_SIZE } from '~/constants';
import { Pagination } from '@mindenit/ui';

import { ref } from 'vue';
import type { Question } from '~/types';

const { find } = useStrapi();

useSeoMeta({
  title: 'Пошук | Answers',
});

const query = ref('');
const currentPage = ref(1);

const { data: questions, status } = await useAsyncData(
  'questions',
  () =>
    find<Question>('questions', {
      populate: 'test',
      pagination: {
        page: currentPage.value,
        pageSize: PAGE_SIZE,
      },
      filters: {
        name: { $contains: query.value },
        verified: { $eq: true },
      },
    }),
  { watch: [query, currentPage], immediate: false, lazy: true },
);
</script>

<template>
  <div class="container">
    <SearchField
      v-model="query"
      placeholder="Введіть питання для пошуку..."
      autofocus
    />
    <div class="mt-4">
      <div v-if="questions?.data.length" class="flex flex-col gap-2">
        <QuestionCard
          v-for="question in questions.data"
          :key="question.id"
          :questionId="question.id"
          :question="question.attributes"
          :showTestInfo="true"
        >
        </QuestionCard>
      </div>
      <FallbackCard v-if="status === 'pending'">
        <Icon class="size-10" name="svg-spinners:180-ring" />
      </FallbackCard>
      <FallbackCard
        v-if="status !== 'pending' && query.length && !questions?.data.length"
      >
        <Icon class="size-10" name="ph:info" />
        <Heading size="tiny">За вашим запитом нічого не знайдено</Heading>
      </FallbackCard>
      <FallbackCard
        v-if="status !== 'pending' && !query.length && !questions?.data.length"
      >
        <Icon class="size-10" name="ph:info" />
        <Heading size="tiny">Введіть питання для пошуку</Heading>
      </FallbackCard>
    </div>
    <div
      v-if="getPagesCount(questions?.meta.pagination.total) > 1"
      class="inline-flex w-full items-center justify-center mt-4"
    >
      <Pagination
        v-model:page="currentPage"
        :items-per-page="PAGE_SIZE"
        :total="questions?.meta.pagination.total"
      />
    </div>
  </div>
</template>
