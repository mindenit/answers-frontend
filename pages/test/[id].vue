<script lang="ts" setup>
import { Heading } from '@mindenit/ui';
import type { Test } from '~/types';

const route = useRoute();
const { findOne } = useStrapi();

const { data: test } = await useAsyncData(
  'tests',
  () =>
    findOne<Test>('tests', route.params.id as string, {
      populate: [
        'questions',
        'questions.answerPhoto',
        'questions.questionPhoto',
      ],
    }),
  {},
);

const currentQuestion = ref('');

const { markdown } = useMarkdown();

useSeoMeta({
  title: `Тест: ${test.value?.data.attributes.name} | Answers`,
  description: `Відповіді на тест "${test.value?.data.attributes.name}"`,
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          currentQuestion.value = entry.target.getAttribute('id')!;
        }
      });
    },
    {
      rootMargin: '0px 0px -70% 0px',
      threshold: 0, //
    },
  );
  document.querySelectorAll('.question').forEach((element) => {
    observer.observe(element);
  });
});
</script>

<template>
  <div class="container">
    <div v-if="!test?.data">
      <Heading size="medium" class="text-center">Сталася помилка</Heading>
    </div>
    <div v-else>
      <div
        class="flex justify-center items-center w-full border-fiord-300 border-b dark:border-fiord-700 pb-4 mb-4"
      >
        <Heading
          size="medium"
          class="mb-4 flex items-center gap-2 flex-col text-center"
        >
          {{ test?.data.attributes.name }}
          <VerifiedBadge
            type="test"
            :mobileBadge="true"
            v-if="test?.data.attributes.verified"
          />
        </Heading>
      </div>

      <div class="flex lg:flex-row flex-col gap-2">
        <aside
          class="hidden lg:block w-[250px] flex-col gap-1 sticky self-start top-0"
        >
          <div class="flex flex-col gap-1">
            <a
              v-for="{ id, attributes: question } in test?.data.attributes
                .questions.data"
              :key="id"
              :href="`#${id}`"
              :class="{
                'dark:text-white border dark:border-fiord-700 dark:bg-fiord-900 bg-fiord-100':
                  id.toString() === currentQuestion,
                'text-gray-700': id.toString() !== currentQuestion,
              }"
              class="w-full overflow-hidden overflow-ellipsis text-nowrap rounded-lg dark:hover:bg-fiord-900 hover:bg-fiord-100 p-2 transition-all"
              v-html="markdown.render(question.name)"
            />
          </div>
        </aside>

        <main
          class="flex flex-col gap-2 w-full lg:pl-2 lg:border-l border-fiord-300 dark:border-fiord-700"
        >
          <QuestionCard
            v-for="{ id, attributes: question } in test?.data.attributes
              .questions.data"
            :key="id"
            class="question"
            :id
            :questionId="id"
            :question
          >
          </QuestionCard>
        </main>
      </div>
    </div>
  </div>
</template>
