<script setup lang="ts">
import {
  Button,
  Heading,
  IconButton,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextAreaInput,
  TextAreaRoot,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  type TextAreaInputComponent,
  ToggleGroupRoot,
  ToggleGroupItem,
} from '@mindenit/ui';
import type { Strapi4ResponseMany } from '@nuxtjs/strapi';
import type { Question, Test } from '~/types';

definePageMeta({
  middleware: 'auth',
});

useSeoMeta({
  title: 'Додати | Answers',
});

const { find, create, findOne, update } = useStrapi();
const router = useRouter();

const { data: tests, status: testsStatus } = await useAsyncData(
  'verified-tests',
  () =>
    find<Test>('tests', {
      sort: ['createdAt:desc'],
      filters: {
        verified: { $eq: true },
      },
    }),
);

const { markdown } = useMarkdown();
const editorMode = ref<'edit' | 'preview'>('edit');

const inputValue = ref('');
const selectedTest = ref('');
const textareaRef = useTemplateRef<TextAreaInputComponent>('textarea');
const { blocks, onCorrectClick, onHashClick } = useEditor({
  inputValue,
  textareaRef,
});

const isSubmitDisabled = computed(() => {
  return (
    !selectedTest.value.length ||
    !blocks.value.length ||
    blocks.value.some(
      (block) => !block.title.trim().length || !block.answers.length,
    )
  );
});

const onClick = async () => {
  for (let i = 0; i < blocks.value.length; i++) {
    await create<Question>('questions', {
      name: blocks.value[i].title,
      verified: false,
      answer: blocks.value[i].answers.toString(),
      // @ts-ignore
      test: +selectedTest.value,
    });
  }

  inputValue.value = '';
  editorMode.value = 'edit';
};

const { alt_1, alt_2 } = useMagicKeys();

watch([alt_1, alt_2], () => {
  if (alt_1.value) onHashClick();
  if (alt_2.value) onCorrectClick();
});
</script>

<template>
  <Heading size="medium" class="text-center">Сформуйте питання</Heading>
  <div
    class="flex flex-col w-full h-fit box-border rounded-lg border dark:border-fiord-700"
  >
    <div
      class="flex w-full justify-between items-center border-b rounded-t-lg border-b-fiord-200 dark:border-b-fiord-700 p-2 dark:bg-fiord-900 bg-fiord-50"
    >
      <SelectRoot v-model="selectedTest">
        <SelectTrigger placeholder="Виберіть тест" />
        <SelectContent>
          <template v-if="tests?.data.length">
            <SelectItem
              v-for="(test, index) in tests.data"
              :key="index"
              :value="test.id.toString()"
            >
              {{ test.attributes.name }}
            </SelectItem>
          </template>
          <span v-else class="p-3 text-center">
            <Text
              v-show="!tests?.data.length"
              size="subtitle"
              class="select-none"
              >Тести відсутні</Text
            >
            <Icon
              v-show="testsStatus === 'pending'"
              name="svg-spinners:180-ring"
              class="size-5"
            />
          </span>
        </SelectContent>
      </SelectRoot>
      <div class="flex items-center justify-end gap-1">
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>
              <IconButton
                @click="onHashClick"
                variant="ghost"
                icon="ph:text-align-center"
              />
            </TooltipTrigger>
            <TooltipContent>Додати тайтл питання (Alt + 1)</TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>
              <IconButton
                variant="ghost"
                icon="ph:check-circle"
                @click="onCorrectClick"
              />
            </TooltipTrigger>
            <TooltipContent>Додати відповідь (Alt + 2)</TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
        <ToggleGroupRoot
          v-model="editorMode"
          default-value="edit"
          type="single"
          appearance="icon"
        >
          <ToggleGroupItem value="edit">
            <Icon name="ph:note-pencil" />
          </ToggleGroupItem>
          <ToggleGroupItem value="preview">
            <Icon name="ph:eye" />
          </ToggleGroupItem>
        </ToggleGroupRoot>
      </div>
    </div>
    <div class="p-2" v-if="editorMode === 'edit'">
      <TextAreaRoot>
        <TextAreaInput
          v-model="inputValue"
          ref="textarea"
          autofocus
          placeholder="Введіть заголовок питання та відповіді на питання, використовуйте кнопки над полем для редагування введеної інформації"
        />
      </TextAreaRoot>
    </div>
    <div v-else class="p-2">
      <template v-if="blocks.length">
        <QuestionCard
          v-for="(block, index) in blocks"
          :question="{
            name: block.title,
            verified: false,
            answer: block.answers[0],
          }"
          :key="index"
        />
      </template>
    </div>
    <div class="flex w-full justify-end items-center px-2 pb-2">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger>
            <Button @click="onClick" size="md" :disabled="isSubmitDisabled">
              Відправити
            </Button>
          </TooltipTrigger>
          <TooltipContent v-if="isSubmitDisabled">
            Оберіть курс та заповніть поле вводу
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    </div>
  </div>
</template>
