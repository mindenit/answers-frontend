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
import type { Course, Faculty, Subject, University } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  error: string;
  test: any;
  faculties: Faculty[];
  universities: University[];
  courses: Course[];
  subjects: Subject[];
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
      <DialogHeader title="Тест" />
      <DialogBody class="dark:text-white">
        <FormLabel for="test-name">Назва тесту</FormLabel>
        <TextFieldRoot>
          <TextFieldInput
            id="test-name"
            required
            placeholder="Введіть назву предмету"
            v-model="test.name"
          />
        </TextFieldRoot>

        <FormLabel for="test-checkbox">Тест верифіковано?</FormLabel>
        <Checkbox id="test-checkbox" v-model:checked="test.isVerified" />

        <SelectRoot v-model="test.universityId">
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

        <SelectRoot v-model="test.facultyId">
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

        <SelectRoot v-model="test.courseId">
          <SelectTrigger placeholder="Виберіть курс" />
          <SelectContent>
            <template v-if="courses.length">
              <SelectItem
                v-for="(course, index) in courses"
                :key="index"
                :value="course.id!.toString()"
              >
                {{ course.number }}
              </SelectItem>
            </template>
            <span v-else class="p-3 text-center">
              <Text v-show="!courses.length" size="subtitle" class="select-none"
                >Курси відсутні</Text
              >
            </span>
          </SelectContent>
        </SelectRoot>

        <SelectRoot v-model="test.subjectId">
          <SelectTrigger placeholder="Виберіть предмет" />
          <SelectContent>
            <template v-if="subjects.length">
              <SelectItem
                v-for="(subject, index) in subjects"
                :key="index"
                :value="subject.id!.toString()"
              >
                {{ subject.name }}
              </SelectItem>
            </template>
            <span v-else class="p-3 text-center">
              <Text
                v-show="!subjects.length"
                size="subtitle"
                class="select-none"
                >Предмети відсутні</Text
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
            !test.name.length ||
            !test.courseId.length ||
            !test.facultyId.length ||
            !test.subjectId.length ||
            !test.universityId.length
          "
          >{{ props.mode === 'create' ? 'Створити' : 'Змінити' }}</Button
        >
      </DialogBody>
    </DialogContent>
  </DialogRoot>
</template>
