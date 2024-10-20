<script lang="ts" setup>
import {
  Button,
  Checkbox,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  FormLabel,
  IconButton,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from '@mindenit/ui';
import type { Test } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  error: string;
  question: any;
  tests: Test[];
  onIconClick?: () => void;
  onSubmit: () => void | Promise<any>;
}

const props = defineProps<Props>();

const icon = computed(() => {
  return props.mode === 'create' ? 'ph:plus' : 'ph:pen';
});
</script>
<template>
  <DialogRoot>
    <DialogTrigger>
      <IconButton @click="props.onIconClick" :icon />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader title="Питання" />
      <DialogBody class="dark:text-white">
        <FormLabel for="question-name">Назва питання</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="question-name"
            required
            placeholder="Введіть назву предмету"
            v-model="question.name"
          />
        </TextFieldRoot>

        <FormLabel for="question-checkbox">Верифіковано?</FormLabel>
        <Checkbox
          id="question-checkbox"
          v-model:checked="question.isVerified"
        />

        <SelectRoot v-model="question.testId">
          <SelectTrigger placeholder="Виберіть тест" />
          <SelectContent>
            <template v-if="tests.length">
              <SelectItem
                v-for="(test, index) in tests"
                :key="index"
                :value="test.id!.toString()"
              >
                {{ test.name }}
              </SelectItem>
            </template>
            <span v-else class="p-3 text-center">
              <Text v-show="!tests.length" size="subtitle" class="select-none"
                >Університети відсутні</Text
              >
            </span>
          </SelectContent>
        </SelectRoot>

        <div class="flex w-full justify-start" v-if="error">
          <p class="text-amaranth-500">
            {{ error }}
          </p>
        </div>

        <Button
          @click="props.onSubmit"
          :disabled="
            !question?.name?.length ||
            !question?.answer?.length ||
            !question?.testId?.length
          "
        >
          {{ props.mode === 'create' ? 'Створити' : 'Змінити' }}
        </Button>
      </DialogBody>
    </DialogContent>
  </DialogRoot>
</template>
