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
import type { University } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  error: string;
  university: University;
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
      <DialogHeader title="Університет" />
      <DialogBody>
        <FormLabel for="university-name">Повна назва</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="university-name"
            required
            placeholder="Введіть назву уніерситету"
            v-model="props.university.name"
          />
        </TextFieldRoot>

        <FormLabel for="university-brief">Коротка назва</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="university-brief"
            required
            placeholder="Введіть коротку назву (ХНУРЕ, ХАІ...)"
            v-model="props.university.brief"
          />
        </TextFieldRoot>

        <div class="flex w-full justify-start" v-if="props.error">
          <p class="text-amaranth-500">
            {{ props.error }}
          </p>
        </div>

        <Button
          @click="props.onSubmit"
          :disabled="
            !props.university.name.length || !props.university.brief.length
          "
          >{{ props.mode === 'create' ? 'Створити' : 'Змінити' }}</Button
        >
      </DialogBody>
    </DialogContent>
  </DialogRoot>
</template>
