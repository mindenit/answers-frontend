<script lang="ts" setup>
import { Badge, Text } from '@mindenit/ui';
import type { Test } from '~/types';

const props = defineProps<{ test: Test; id: number }>();

const facultiesFallback = computed(() => {
  return props.test.faculties.data.length > 1
    ? `Факультети: ${props.test.faculties.data.map((f) => f.attributes.name).join(', ')}`
    : `Факультет: ${props.test.faculties.data.at(0)?.attributes.name}`;
});
</script>

<template>
  <NuxtLink
    :to="`/test/${id}`"
    class="flex md:flex-row flex-col w-full p-3 bg-transparent items-center justify-between border-fiord-300 border dark:border-fiord-700 rounded-xl cursor-pointer dark:hover:border-fiord-600 dark:hover:bg-fiord-900 hover:border-fiord-400 hover:bg-fiord-50 dark:focus:border-royal-blue-500 focus:border-royal-blue-600 focus:ring focus:ring-royal-blue-500/40 focus:outline-none"
  >
    <div class="inline-flex items-center justify-start gap-3">
      <div
        class="flex items-center justify-center size-10 rounded-full text-xl text-black dark:text-white border border-fiord-300 dark:border-fiord-700"
      >
        <Icon name="ph:book-bookmark" />
      </div>
      <Text size="paragraph">{{ test.name }}</Text>
    </div>
    <div
      class="flex md:flex-nowrap mt-2 md:mt-0 flex-wrap items-center md:justify-end justify-center gap-3"
    >
      <Badge>{{ facultiesFallback }}</Badge>
      <Badge>Курс: {{ test.course.data.attributes.number }}</Badge>
      <Badge>Предмет: {{ test.subject.data.attributes.brief }}</Badge>
    </div>
  </NuxtLink>
</template>
