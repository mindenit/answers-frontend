<script lang="ts" setup>
import { Text } from '@mindenit/ui';
import type { Question } from '~/types';

interface Props {
  question: Omit<Question, 'publishedAt' | 'createdAt' | 'updatedAt'>;
  showTestInfo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTestInfo: false,
});

const { markdown } = useMarkdown();

const titleParsed = computed(() => markdown.render(props.question.name));
const answerParsed = computed(() => markdown.render(props.question.answer));
</script>
<template>
  <div
    class="flex flex-col dark:bg-fiord-900 bg-fiord-50 w-full h-fit p-3 rounded-xl border border-fiord-300 dark:border-fiord-700 gap-2"
  >
    <div class="flex items-center gap-2 justify-between" v-if="props.question.id">
      <Text size="subtitle">ID Питання: {{ props.question.id }} </Text>
      <VerifiedBadge type="question" v-if="props.question.isVerified" />
    </div>
    <div class="flex items-center gap-2" v-html="titleParsed" />
    <div
      class="flex items-center gap-2 p-2 dark:bg-christi-950 bg-christi-100 rounded-lg"
    >
      <Icon name="ph:check-circle-fill" class="text-christi-400" />
      <div v-html="answerParsed" />
    </div>
    <Text size="subtitle" v-if="props.showTestInfo">
      <NuxtLink :to="`/test/${question.testId}`">
        Перейти до тесту
      </NuxtLink>
    </Text>
  </div>
</template>
