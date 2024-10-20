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
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from '@mindenit/ui';
import type { Faculty } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  error: string;
  subject: any;
  faculties: Faculty[];
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
      <DialogHeader title="Предмет" />
      <DialogBody class="dark:text-white">
        <FormLabel for="subject-name">Назва предмету</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="subject-name"
            required
            placeholder="Введіть назву предмету"
            v-model="subject.name"
          />
        </TextFieldRoot>

        <FormLabel for="subject-brief">Коротка назва</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="subject-brief"
            required
            placeholder="Введіть коротку назву (ОБД, ФВ...)"
            v-model="subject.brief"
          />
        </TextFieldRoot>

        <SelectRoot v-model="subject.facultyId">
          <SelectTrigger placeholder="Виберіть факультет" />
          <SelectContent>
            <template v-if="faculties.length">
              <SelectItem
                v-for="(faculty, index) in faculties"
                :key="index"
                :value="faculty.id!.toString()"
              >
                {{ faculty.name }}
              </SelectItem>
            </template>
            <span v-else class="p-3 text-center">
              <Text
                v-show="!faculties.length"
                size="subtitle"
                class="select-none"
                >Факультети відсутні</Text
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
            !subject.name.length || !subject.brief.length || !subject.facultyId
          "
          >{{ props.mode === 'create' ? 'Створити' : 'Змінити' }}</Button
        >
      </DialogBody>
    </DialogContent>
  </DialogRoot>
</template>
