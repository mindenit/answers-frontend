<script lang="ts" setup>
import {
  Button,
  Checkbox,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  FormLabel,
  Heading,
  IconButton,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextAreaInput,
  TextAreaRoot,
  TextFieldInput,
  TextFieldRoot,
  ToggleGroupItem,
  ToggleGroupRoot,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  type TextAreaInputComponent,
} from '@mindenit/ui';
import type { Course, Faculty, Subject, University } from '~/types';
import { createFaculty } from '~/utils/api';

definePageMeta({
  // middleware: 'admin',
});

useSeoMeta({
  title: 'Адмін панель | Answers',
});

const { data: requestedTests, status: testsStatus } = await getTests();

const { markdown } = useMarkdown();
const editorMode = ref<'edit' | 'preview'>('edit');

const tests = ref(requestedTests);

const universities = ref<University[]>([]);
const faculties = ref<Faculty[]>([]);
const subjects = ref<Subject[]>([]);
const courses = ref<Course[]>([]);

const questionFieldValue = ref('');
const selectedTest = ref('');

const universityData = reactive({
  name: '',
  brief: '',
});

const facultyData = reactive({
  name: '',
  universityId: '',
});

const courseData = reactive({
  number: 0,
});

const subjectData = reactive({
  name: '',
  brief: '',
  facultyId: '',
});

const testData = reactive({
  name: '',
  isVerified: false,
  universityId: '',
  facultyId: '',
  subjectId: '',
  courseId: '',
});

const textareaRef = useTemplateRef<TextAreaInputComponent>('textarea');

const { blocks, onCorrectClick, onHashClick } = useEditor({
  inputValue: questionFieldValue,
  textareaRef,
});

const isSubmitDisabled = computed(() => {
  return (
    !selectedTest.value.length ||
    !blocks.value.length ||
    blocks.value.some(
      (block) => !block.title.trim().length || !block.answers.length
    )
  );
});

const onClick = async () => {
  const { data, status, error } = await createQuestions(
    selectedTest.value,
    blocks.value.map((item) => ({
      name: item.title.trim(),
      isVerified: true,
      answer: item.answers.toString(),
    }))
  );
  questionFieldValue.value = '';
  editorMode.value = 'edit';
};

const { alt_1, alt_2 } = useMagicKeys();

watch([alt_1, alt_2], () => {
  if (alt_1.value) onHashClick();
  if (alt_2.value) onCorrectClick();
});

const onReloadClick = async () => {
  const { data: requestedTests, status } = await getTests();
  if (status.value === 'success') {
    tests.value = requestedTests.value;
  }
};

const sendUniversityInfo = async () => {
  const { data, status } = await createUniversity({
    name: universityData.name.trim(),
    brief: universityData.brief.trim(),
  });
  if (status.value === 'success') {
    universityData.name = '';
    universityData.brief = '';
  }
};

const sendFacultyInfo = async () => {
  const { data, status } = await createFaculty({
    name: facultyData.name.trim(),
    universityId: Number(facultyData.universityId),
  });
  if (status.value === 'success') {
    facultyData.name = '';
    facultyData.universityId = '';
  }
};

const sendCourseInfo = async () => {
  const { data, status } = await createCourse({
    number: Number(courseData.number),
  });
  if (status.value === 'success') {
    courseData.number = -1;
  }
};

const sendSubjectInfo = async () => {
  const { data, status } = await createSubject({
    name: subjectData.name.trim(),
    brief: subjectData.brief.trim(),
    facultyId: Number(subjectData.facultyId),
  });
  if (status.value === 'success') {
    subjectData.name = '';
    subjectData.brief = '';
    subjectData.facultyId = '';
  }
};

const sendTestInfo = async () => {
  const { data, status } = await createTest({
    name: testData.name.trim(),
    isVerified: testData.isVerified,
    facultyId: Number(testData.facultyId),
    subjectId: Number(testData.subjectId),
    courseId: Number(testData.courseId),
    universityId: Number(testData.universityId),
  });

  if (status.value === 'success') {
    testData.name = '';
    testData.isVerified = false;
    testData.facultyId = '';
    testData.courseId = '';
    testData.subjectId = '';
    testData.universityId = '';
  }
};

const isSubmitDisabledUni = computed(() => {
  return !universityData.name.length || !universityData.brief.length;
});

const isSubmitDisabledFaculty = computed(() => {
  return !facultyData.name.length || !facultyData.universityId;
});

const isSubmitDisabledCourse = computed(() => {
  return !courseData.number || courseData.number < 0;
});

const isSubmitDisabledSubject = computed(() => {
  return (
    !subjectData.name.length ||
    !subjectData.brief.length ||
    !subjectData.facultyId
  );
});

const isSubmitDisabledTest = computed(() => {
  return (
    !testData.name.length ||
    !testData.courseId.length ||
    !testData.facultyId.length ||
    !testData.subjectId.length ||
    !testData.universityId.length
  );
});

const updateUniversities = async () => {
  const { data, status } = await getUniversities();
  if (status.value === 'success' && data.value !== null) {
    universities.value = data.value;
  }
};

const updateFaculties = async () => {
  const { data, status } = await getFaculties();
  if (status.value === 'success' && data.value !== null) {
    faculties.value = data.value;
  }
};

const updateEverything = async () => {
  const [universitiesData, facultiesData, subjectsData, coursesData] =
    await Promise.all([
      getUniversities(),
      getFaculties(),
      getSubjects(),
      getCourses(),
    ]);

  if (
    universitiesData.status.value === 'success' &&
    universitiesData.data.value
  ) {
    universities.value = universitiesData.data.value;
  }

  if (facultiesData.status.value === 'success' && facultiesData.data.value) {
    faculties.value = facultiesData.data.value;
  }

  if (subjectsData.status.value === 'success' && subjectsData.data.value) {
    subjects.value = subjectsData.data.value;
  }

  if (coursesData.status.value === 'success' && coursesData.data.value) {
    courses.value = coursesData.data.value;
  }
};
</script>
<template>
  <Heading size="medium" class="text-center">Адмін панель</Heading>
  <div class="flex gap-2">
    <DialogRoot>
      <DialogTrigger>
        <Button>Додати університет</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Додати університет" />
        <DialogBody class="dark:text-white">
          <FormLabel for="university-name">Повна назва</FormLabel>
          <TextFieldRoot>
            <TextFieldInput
              id="university-name"
              required
              placeholder="Введіть назву уніерситету"
              v-model="universityData.name"
            />
          </TextFieldRoot>

          <FormLabel for="university-brief">Коротка назва</FormLabel>
          <TextFieldRoot>
            <TextFieldInput
              id="university-brief"
              required
              placeholder="Введіть коротку назву (ХНУРЕ, ХАІ...)"
              v-model="universityData.brief"
            />
          </TextFieldRoot>

          <DialogClose asChild>
            <Button @click="sendUniversityInfo" :disabled="isSubmitDisabledUni"
              >Створити</Button
            >
          </DialogClose>
        </DialogBody>
      </DialogContent>
    </DialogRoot>

    <DialogRoot>
      <DialogTrigger>
        <Button @click="updateUniversities">Додати факультет</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Додати факультет" />
        <DialogBody class="dark:text-white">
          <FormLabel for="faculty-name">Назва</FormLabel>
          <TextFieldRoot>
            <TextFieldInput
              id="faculty-name"
              required
              placeholder="Введіть назву факультету"
              v-model="facultyData.name"
            />
          </TextFieldRoot>
          <SelectRoot v-model="facultyData.universityId">
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

          <DialogClose asChild>
            <Button @click="sendFacultyInfo" :disabled="isSubmitDisabledFaculty"
              >Створити</Button
            >
          </DialogClose>
        </DialogBody>
      </DialogContent>
    </DialogRoot>

    <DialogRoot>
      <DialogTrigger>
        <Button>Додати курс</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Додати курс" />
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
              v-model="courseData.number"
            />
          </TextFieldRoot>

          <DialogClose asChild>
            <Button @click="sendCourseInfo" :disabled="isSubmitDisabledCourse"
              >Створити</Button
            >
          </DialogClose>
        </DialogBody>
      </DialogContent>
    </DialogRoot>

    <DialogRoot>
      <DialogTrigger>
        <Button @click="updateFaculties">Додати предмет</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Додати предмет" />
        <DialogBody class="dark:text-white">
          <FormLabel for="subject-name">Назва предмету</FormLabel>
          <TextFieldRoot>
            <TextFieldInput
              id="subject-name"
              required
              placeholder="Введіть назву предмету"
              v-model="subjectData.name"
            />
          </TextFieldRoot>

          <FormLabel for="subject-brief">Коротка назва</FormLabel>
          <TextFieldRoot>
            <TextFieldInput
              id="subject-brief"
              required
              placeholder="Введіть коротку назву (ОБД, ФВ...)"
              v-model="subjectData.brief"
            />
          </TextFieldRoot>

          <SelectRoot v-model="subjectData.facultyId">
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

          <DialogClose asChild>
            <Button @click="sendSubjectInfo" :disabled="isSubmitDisabledSubject"
              >Створити</Button
            >
          </DialogClose>
        </DialogBody>
      </DialogContent>
    </DialogRoot>

    <DialogRoot>
      <DialogTrigger>
        <Button @click="updateEverything">Додати тест</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Додати тест" />
        <DialogBody class="dark:text-white">
          <FormLabel for="test-name">Назва тесту</FormLabel>
          <TextFieldRoot>
            <TextFieldInput
              id="test-name"
              required
              placeholder="Введіть назву предмету"
              v-model="testData.name"
            />
          </TextFieldRoot>

          <FormLabel for="test-checkbox">Тест верифіковано?</FormLabel>
          <Checkbox id="test-checkbox" v-model:checked="testData.isVerified" />

          <SelectRoot v-model="testData.universityId">
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

          <SelectRoot v-model="testData.facultyId">
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

          <SelectRoot v-model="testData.courseId">
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
                <Text
                  v-show="!courses.length"
                  size="subtitle"
                  class="select-none"
                  >Курси відсутні</Text
                >
              </span>
            </SelectContent>
          </SelectRoot>

          <SelectRoot v-model="testData.subjectId">
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

          <DialogClose asChild>
            <Button @click="sendTestInfo" :disabled="isSubmitDisabledTest"
              >Створити</Button
            >
          </DialogClose>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
    <Button variant="outlined" asChild>
      <NuxtLink to="/admin/preview">Сторінка перегляду</NuxtLink>
    </Button>
  </div>

  <div
    class="flex flex-col w-full h-fit box-border rounded-lg border dark:border-fiord-700"
  >
    <div
      class="flex w-full justify-between items-center border-b rounded-t-lg border-b-fiord-200 dark:border-b-fiord-700 p-2 dark:bg-fiord-900 bg-fiord-50 flex-col md:flex-row"
    >
      <div class="flex gap-1">
        <SelectRoot v-model="selectedTest">
          <SelectTrigger placeholder="Виберіть тест" />
          <SelectContent>
            <template v-if="tests?.data.length">
              <SelectItem
                v-for="(test, index) in tests.data"
                :key="index"
                :value="test.id!.toString()"
              >
                {{ test.name }}
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
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>
              <IconButton
                @click="onReloadClick"
                variant="ghost"
                icon="ph:arrow-arc-left"
              />
            </TooltipTrigger>
            <TooltipContent>Перезавантажити список тестів</TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
      </div>
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
          class="textarea"
          v-model="questionFieldValue"
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
            id: index,
            name: block.title,
            isVerified: false,
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
<style scoped>
.textarea {
  field-sizing: content;
  min-height: 4lh;
}
</style>
