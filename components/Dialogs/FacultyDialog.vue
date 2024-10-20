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
import type { University } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  error: string;
  faculty: any;
  universities: University[];
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
      <DialogHeader title="Факультет" />
      <DialogBody class="dark:text-white">
        <FormLabel for="faculty-name">Назва</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="faculty-name"
            required
            placeholder="Введіть назву факультету"
            v-model="faculty.name"
          />
        </TextFieldRoot>
        <SelectRoot v-model="faculty.universityId">
          <SelectTrigger placeholder="Виберіть університет" />
          <SelectContent>
            <template v-if="universities.length">
              <SelectItem
                v-for="(university, index) in universities"
                :key="index"
                :value="university.id!.toString()"
              >
                {{ university.brief }}
              </SelectItem>
            </template>
            <span v-else class="p-3 text-center">
              <Text
                v-show="!universities.length"
                size="subtitle"
                class="select-none"
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
          :disabled="!faculty.name.length || !faculty.universityId"
          >{{ props.mode === 'create' ? 'Створити' : 'Змінити' }}</Button
        >
      </DialogBody>
    </DialogContent>
  </DialogRoot>
</template>
