<script lang="ts" setup>
import {
  Button,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  FormLabel,
  IconButton,
  TextFieldInput,
  TextFieldRoot,
} from '@mindenit/ui';
import type { Course } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  error: string;
  course: Course;
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
      <IconButton :icon @click="props.onIconClick" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader title="Курс" />
      <DialogBody class="dark:text-white">
        <FormLabel for="course-number">Номер курсу</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="course-number"
            type="number"
            min="1"
            max="6"
            required
            placeholder="Введіть номер курсу"
            v-model="course.number"
          />
        </TextFieldRoot>

        <div class="flex w-full justify-start" v-if="error">
          <p class="text-amaranth-500">
            {{ error }}
          </p>
        </div>

        <Button
          @click="props.onSubmit"
          :disabled="!course.number || course.number < 0"
          >{{ props.mode === 'create' ? 'Створити' : 'Змінити' }}</Button
        >
      </DialogBody>
    </DialogContent>
  </DialogRoot>
</template>
