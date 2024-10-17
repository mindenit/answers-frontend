<script lang="ts" setup>
import { Heading, SearchField } from '@mindenit/ui';
import { PAGE_SIZE } from '~/constants';

useSeoMeta({
  title: 'Пошук | Answers',
});

const query = ref('');
const currentPage = ref(1);
const debouncedQuery = useDebounce(query, 300);

const { data: questions, status } = await getQuestions({
  watch: [debouncedQuery, currentPage],
  immediate: false,
  lazy: true,
});

const filteredQuestions = computed(() => {
  if (!questions.value) return [];
  return questions.value.filter((question) =>
    question.name.toLowerCase().includes(debouncedQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <SearchField
      v-model="query"
      placeholder="Введіть питання для пошуку..."
      autofocus
    />
    <div class="mt-4 gap-2">
      <div v-if="filteredQuestions?.length" class="flex flex-col gap-2">
        <QuestionCard
          v-for="question in filteredQuestions"
          :key="question.id"
          :question="question"
          :showTestInfo="true"
        >
        </QuestionCard>
      </div>
      <FallbackCard v-if="status === 'pending'">
        <Icon class="size-10" name="svg-spinners:180-ring" />
      </FallbackCard>
      <FallbackCard
        v-if="
          status !== 'pending' && query.length && !filteredQuestions?.length
        "
      >
        <Icon class="size-10" name="ph:info" />
        <Heading size="tiny">За вашим запитом нічого не знайдено</Heading>
      </FallbackCard>
      <FallbackCard v-if="!query.length && !filteredQuestions?.length">
        <Icon class="size-10" name="ph:info" />
        <Heading size="tiny">Введіть питання для пошуку</Heading>
      </FallbackCard>
    </div>
    <div
      v-if="getPagesCount(questions?.length) > 1"
      class="inline-flex w-full items-center justify-center mt-4"
    >
      <Pagination
        v-model:page="currentPage"
        :items-per-page="PAGE_SIZE"
        :total="filteredQuestions.length"
      />
    </div>
  </div>
</template>
