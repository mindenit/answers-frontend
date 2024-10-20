<script lang="ts" setup>
import {
  AccordionItem,
  AccordionRoot,
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
  ToggleGroupItem,
  ToggleGroupRoot,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  type TextAreaInputComponent,
} from '@mindenit/ui';
import Card from '~/components/Card.vue';
import CourseDialog from '~/components/Dialogs/CourseDialog.vue';
import FacultyDialog from '~/components/Dialogs/FacultyDialog.vue';
import QuestionDialog from '~/components/Dialogs/QuestionDialog.vue';
import SubjectDialog from '~/components/Dialogs/SubjectDialog.vue';
import TestDialog from '~/components/Dialogs/TestDialog.vue';
import UniversityDialog from '~/components/Dialogs/UniversityDialog.vue';
import type {
  Course,
  Faculty,
  Question,
  Subject,
  Test,
  University,
} from '~/types';

definePageMeta({
  // middleware: 'admin',
});

useSeoMeta({
  title: 'Адмін панель | Answers',
});
const accordion = ref<string[]>([]);
const dialogState = ref<boolean>();
const error = ref('');

const universities = ref<University[]>([]);
const faculties = ref<Faculty[]>([]);
const courses = ref<Course[]>([]);
const subjects = ref<Subject[]>([]);
const tests = ref<Test[]>([]);
const questions = ref<Question[]>([]);

const { markdown } = useMarkdown();
const editorMode = ref<'edit' | 'preview'>('edit');
const questionFieldValue = ref('');
const selectedTest = ref('');
const textareaRef = useTemplateRef<TextAreaInputComponent>('textarea');

const newData = reactive({
  university: {
    name: '',
    brief: '',
  },
  course: {
    number: 0,
  },
  faculty: {
    name: '',
    universityId: '',
  },
  subject: {
    name: '',
    brief: '',
    facultyId: '',
  },
  test: {
    name: '',
    isVerified: false,
    universityId: '',
    facultyId: '',
    subjectId: '',
    courseId: '',
  },
  question: {
    name: '',
    answer: '',
    isVerified: false,
    testId: '',
  },
});

const isLoading = ref({
  universities: false,
  faculties: false,
  courses: false,
  subjects: false,
  tests: false,
  questions: false,
});

const cache = {
  universities: false,
  faculties: false,
  courses: false,
  subjects: false,
  tests: false,
  questions: false,
};

async function fetchData(
  fetchFunc: () => Promise<any>,
  cacheKey: keyof typeof cache
) {
  if (cache[cacheKey]) return;

  isLoading.value[cacheKey] = true;
  const { data } = await fetchFunc();
  if (data.value) {
    switch (cacheKey) {
      case 'universities':
        universities.value = data.value!;
        break;
      case 'faculties':
        faculties.value = data.value!;
        break;
      case 'courses':
        courses.value = data.value!;
        break;
      case 'subjects':
        subjects.value = data.value!;
        break;
      case 'tests':
        tests.value = data.value?.data!;
        break;
      case 'questions':
        questions.value = data.value!;
        break;
    }
  }
  isLoading.value[cacheKey] = false;
  cache[cacheKey] = true;
}

watch(accordion, (newAccordion) => {
  if (newAccordion.includes('universities'))
    fetchData(getUniversities, 'universities');
  if (newAccordion.includes('faculties')) fetchData(getFaculties, 'faculties');
  if (newAccordion.includes('courses')) fetchData(getCourses, 'courses');
  if (newAccordion.includes('subjects')) fetchData(getSubjects, 'subjects');
  if (newAccordion.includes('tests')) fetchData(getTests, 'tests');
  if (newAccordion.includes('questions')) {
    fetchData(getQuestions, 'questions');
    fetchData(getTests, 'tests');
  }
});

async function removeEntity(
  id: number,
  deleteFunc: (id: number) => Promise<any>,
  cacheKey: keyof typeof cache,
  fetchFunc: () => Promise<void>
) {
  await deleteFunc(id);
  cache[cacheKey] = false;
  await fetchFunc();
}

const sendInfo = async (
  type: 'university' | 'course' | 'faculty' | 'subject' | 'test'
) => {
  error.value = '';

  const createFunctions: Record<string, () => Promise<any>> = {
    university: async () => {
      const { status, error: err } = await createUniversity({
        name: newData.university.name.trim(),
        brief: newData.university.brief.trim(),
      });
      return { status, err };
    },
    course: async () => {
      const { status, error: err } = await createCourse({
        number: newData.course.number,
      });
      return { status, err };
    },
    faculty: async () => {
      const { status, error: err } = await createFaculty({
        name: newData.faculty.name.trim(),
        universityId: Number(newData.faculty.universityId),
      });
      return { status, err };
    },
    subject: async () => {
      const { status, error: err } = await createSubject({
        name: newData.subject.name.trim(),
        brief: newData.subject.brief.trim(),
        facultyId: Number(newData.subject.facultyId),
      });
      return { status, err };
    },
    test: async () => {
      const { status, error: err } = await createTest({
        name: newData.test.name.trim(),
        isVerified: newData.test.isVerified,
        facultyId: Number(newData.test.facultyId),
        subjectId: Number(newData.test.subjectId),
        courseId: Number(newData.test.courseId),
        universityId: Number(newData.test.universityId),
      });
      return { status, err };
    },
  };

  const { status, err } = await createFunctions[type]();

  if (status.value === 'success') {
    switch (type) {
      case 'university':
        newData.university.name = '';
        newData.university.brief = '';
        cache.universities = false;
        await fetchData(getUniversities, 'universities');
        break;
      case 'course':
        newData.course.number = 0;
        cache.courses = false;
        await fetchData(getCourses, 'courses');
        break;
      case 'faculty':
        newData.faculty.name = '';
        newData.faculty.universityId = '';
        cache.faculties = false;
        await fetchData(getFaculties, 'faculties');
        break;
      case 'subject':
        newData.subject.name = '';
        newData.subject.brief = '';
        newData.subject.facultyId = '';
        await fetchData(getSubjects, 'subjects');
        break;
      case 'test':
        newData.test.name = '';
        newData.test.isVerified = false;
        newData.test.facultyId = '';
        newData.test.courseId = '';
        newData.test.subjectId = '';
        newData.test.universityId = '';
        await fetchData(getTests, 'tests');
        break;
    }
    return (dialogState.value = false);
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};

const onReloadClick = async () => {
  const { data: requestedTests, status } = await getTests();
  if (status.value === 'success') {
    tests.value = requestedTests.value!.data;
  }
};

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
  await fetchData(getQuestions, 'questions');
};

const isSubmitDisabled = computed(() => {
  return (
    !selectedTest.value.length ||
    !blocks.value.length ||
    blocks.value.some(
      (block) => !block.title.trim().length || !block.answers.length
    )
  );
});

const { blocks, onCorrectClick, onHashClick } = useEditor({
  inputValue: questionFieldValue,
  textareaRef,
});

const { alt_1, alt_2 } = useMagicKeys();

watch([alt_1, alt_2], () => {
  if (alt_1.value) onHashClick();
  if (alt_2.value) onCorrectClick();
});

const reloadAll = async () => {
  await fetchData(getUniversities, 'universities');
  await fetchData(getCourses, 'courses');
  await fetchData(getFaculties, 'faculties');
  await fetchData(getSubjects, 'subjects');
  await fetchData(getTests, 'tests');
  await fetchData(getQuestions, 'questions');
};

const getUniversityData = (id: string | number) => {
  const university = universities.value.find((u) => u.id === id);
  if (university) {
    newData.university.name = university?.name;
    newData.university.brief = university?.brief;
  }
};

const editUni = async (id: string | number, payload: University) => {
  const {
    data,
    status,
    error: err,
  } = await editUniversity(id, {
    name: payload.name.trim(),
    brief: payload.brief.trim(),
  });
  if (status.value === 'success') {
    newData.university.name = '';
    newData.university.brief = '';
    cache.universities = false;
    await fetchData(getUniversities, 'universities');
    return;
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};

const getCourseData = (id: string | number) => {
  const course = courses.value.find((c) => c.id === id);
  if (course) {
    newData.course.number = course.number;
  }
};

const editCours = async (id: string | number, payload: Course) => {
  const { data, status, error: err } = await editCourse(id, payload);
  if (status.value === 'success') {
    newData.course.number = 0;
    cache.courses = false;
    await fetchData(getCourses, 'courses');
    return;
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};

const getFacultyData = (id: string | number) => {
  const faculty = faculties.value.find((f) => f.id === id);
  if (faculty) {
    newData.faculty.name = faculty.name;
    newData.faculty.universityId = faculty.universityId.toString();
  }
};

const editFacul = async (id: string | number, payload: Faculty) => {
  const {
    data,
    status,
    error: err,
  } = await editFaculty(id, {
    name: payload.name.trim(),
    universityId: Number(payload.universityId),
  });
  if (status.value === 'success') {
    newData.faculty.name = '';
    newData.faculty.universityId = '';
    cache.faculties = false;
    await fetchData(getFaculties, 'faculties');
    return;
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};

const getSubjectData = (id: string | number) => {
  const subject = subjects.value.find((s) => s.id === id);
  if (subject) {
    newData.subject.name = subject.name;
    newData.subject.brief = subject.brief;
    newData.subject.facultyId = subject.facultyId.toString();
  }
};

const editSub = async (id: string | number, payload: Subject) => {
  const {
    data,
    status,
    error: err,
  } = await editSubject(id, {
    name: payload.name.trim(),
    brief: payload.brief.trim(),
    facultyId: Number(payload.facultyId),
  });
  if (status.value === 'success') {
    newData.test.name = '';
    newData.test.isVerified = false;
    newData.test.facultyId = '';
    newData.test.courseId = '';
    newData.test.subjectId = '';
    newData.test.universityId = '';
    await fetchData(getTests, 'tests');
    return;
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};

const getTestData = (id: string | number) => {
  const test = tests.value.find((t) => t.id === id);
  if (test) {
    newData.test.name = test.name;
    newData.test.isVerified = test.isVerified;
    newData.test.courseId = test.courseId.toString();
    newData.test.facultyId = test.facultyId.toString();
    newData.test.universityId = test.universityId.toString();
    newData.test.subjectId = test.subjectId.toString();
  }
};

const editTst = async (id: string | number, payload: Test) => {
  const {
    data,
    status,
    error: err,
  } = await editTest(id, {
    name: payload.name.trim(),
    isVerified: payload.isVerified,
    facultyId: Number(payload.facultyId),
    courseId: Number(payload.courseId),
    universityId: Number(payload.universityId),
    subjectId: Number(payload.subjectId),
  });
  if (status.value === 'success') {
    newData.faculty.name = '';
    newData.faculty.universityId = '';
    cache.faculties = false;
    await fetchData(getFaculties, 'faculties');
    return;
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};

const getQuestionData = (id: string | number) => {
  const question = questions.value.find((q) => q.id === id);
  if (question) {
    newData.question.name = question.name;
    newData.question.answer = question.answer;
    newData.question.isVerified = question.isVerified;
    newData.question.testId = question.testId!.toString();
  }
};

const editQuestio = async (id: string | number, payload: Question) => {
  const {
    data,
    status,
    error: err,
  } = await editQuestion(id, {
    name: payload.name.trim(),
    answer: payload.answer.trim(),
    isVerified: payload.isVerified,
    testId: Number(payload.testId),
  });
  if (status.value === 'success') {
    newData.question.name = '';
    newData.question.answer = '';
    newData.question.testId = '';
    newData.question.isVerified = false;
    cache.questions = false;
    await fetchData(getFaculties, 'questions');
    return;
  }

  if (status.value === 'error') {
    error.value = err.value!.toString();
  }
};
</script>
<template>
  <div class="flex flex-col items-center gap-2">
    <Heading size="medium">Адмін панель</Heading>
    <Button @click="reloadAll"> Оновити дані (якщо щось пішло не так) </Button>
  </div>
  <AccordionRoot type="multiple" v-model:modelValue="accordion">
    <AccordionItem value="universities">
      <template #title>Університети</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <UniversityDialog
            mode="create"
            :error
            :university="newData.university"
            :onSubmit="() => sendInfo('university')"
          />
          <Card v-for="university in universities" :key="university.id">
            <span>ID: {{ university.id }}</span>
            <span>Назва: {{ university.name }}</span>
            <span>Коротка назва: {{ university.brief }}</span>
            <div class="flex items-center gap-1">
              <IconButton
                variant="danger"
                icon="ph:trash"
                @click="
                  university.id &&
                    removeEntity(
                      university.id,
                      deleteUniversity,
                      'universities',
                      () => fetchData(getUniversities, 'universities')
                    )
                "
              ></IconButton>

              <UniversityDialog
                mode="edit"
                :error
                :university="newData.university"
                :onIconClick="() => getUniversityData(university.id!)"
                :onSubmit="() => editUni(university.id!, newData.university)"
              />
            </div>
          </Card>
        </div>
      </template>
    </AccordionItem>

    <AccordionItem value="courses">
      <template #title>Курси</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <CourseDialog
            mode="create"
            :error
            :course="newData.course"
            :onSubmit="() => sendInfo('course')"
          />
          <Card v-for="course in courses" :key="course.id">
            <span>ID: {{ course.id }}</span>
            <span>Номер курсу: {{ course.number }}</span>
            <div class="flex items-center gap-1">
              <IconButton
                variant="danger"
                icon="ph:trash"
                @click="
                  course.id &&
                    removeEntity(course.id, deleteCourse, 'courses', () =>
                      fetchData(getCourses, 'courses')
                    )
                "
              ></IconButton>
              <CourseDialog
                mode="edit"
                :error
                :course="newData.course"
                :onIconClick="() => getCourseData(course.id!)"
                :onSubmit="() => editCours(course.id!, newData.course)"
              />
            </div>
          </Card>
        </div>
      </template>
    </AccordionItem>

    <AccordionItem value="faculties">
      <template #title>Факультети</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <FacultyDialog
            mode="create"
            :error
            :faculty="newData.faculty"
            :universities
            :onIconClick="() => fetchData(getUniversities, 'universities')"
            :onSubmit="() => sendInfo('faculty')"
          />
          <Card v-for="faculty in faculties" :key="faculty.id">
            <span>ID: {{ faculty.id }}</span>
            <span>Назва: {{ faculty.name }}</span>
            <span>ID університету: {{ faculty.universityId }}</span>
            <div class="flex items-center gap-1">
              <IconButton
                variant="danger"
                icon="ph:trash"
                @click="
                  faculty.id &&
                    removeEntity(faculty.id, deleteFaculty, 'faculties', () =>
                      fetchData(getUniversities, 'universities')
                    )
                "
              ></IconButton>
              <FacultyDialog
                mode="edit"
                :error
                :faculty="newData.faculty"
                :universities
                :onIconClick="
                  () => {
                    fetchData(getUniversities, 'universities');
                    getFacultyData(faculty.id!);
                  }
                "
                :onSubmit="() => editFacul(faculty.id!, {
                  name: newData.faculty.name,
                  universityId: Number(newData.faculty.universityId)
                })"
              />
            </div>
          </Card>
        </div>
      </template>
    </AccordionItem>

    <AccordionItem value="subjects">
      <template #title>Предмети</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <SubjectDialog
            mode="create"
            :error
            :subject="newData.subject"
            :faculties
            :onIconClick="() => fetchData(getFaculties, 'faculties')"
            :onSubmit="() => sendInfo('subject')"
          />
          <Card v-for="subject in subjects" :key="subject.id">
            <span>ID: {{ subject.id }}</span>
            <span>Назва: {{ subject.name }}</span>
            <span>Коротка назва: {{ subject.brief }}</span>
            <span>ID факультету: {{ subject.facultyId }}</span>
            <div class="flex items-center gap-1">
              <IconButton
                variant="danger"
                icon="ph:trash"
                @click="
                  subject.id &&
                    removeEntity(subject.id, deleteSubject, 'subjects', () =>
                      fetchData(getSubjects, 'subjects')
                    )
                "
              ></IconButton>
              <SubjectDialog
                mode="edit"
                :error
                :subject="newData.subject"
                :faculties
                :onIconClick="
                  () => {
                    fetchData(getFaculties, 'faculties');
                    getSubjectData(subject.id!);
                  }
                "
                :onSubmit="() => editSub(subject.id!, {
                  name: newData.subject.name,
                  brief: newData.subject.brief,
                  facultyId: Number(newData.subject.facultyId)
                })"
              />
            </div>
          </Card>
        </div>
      </template>
    </AccordionItem>

    <AccordionItem value="tests">
      <template #title>Тести</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <TestDialog
            mode="create"
            :error
            :test="newData.test"
            :universities
            :faculties
            :courses
            :subjects
            :onIconClick="
              () => {
                fetchData(getUniversities, 'universities');
                fetchData(getCourses, 'courses');
                fetchData(getSubjects, 'subjects');
                fetchData(getFaculties, 'faculties');
              }
            "
            :onSubmit="() => sendInfo('test')"
          />
          <Card v-for="test in tests" :key="test.id">
            <span>ID: {{ test.id }}</span>
            <span>Назва: {{ test.name }}</span>
            <span>Верифікація: {{ test.isVerified ? '+' : '-' }}</span>
            <span>ID факультету: {{ test.facultyId }}</span>
            <span>ID курсу: {{ test.courseId }}</span>
            <span>ID предмету: {{ test.subjectId }}</span>
            <span>ID університету: {{ test.universityId }}</span>
            <div class="flex items-center gap-1">
              <IconButton
                variant="danger"
                icon="ph:trash"
                @click="
                  test.id &&
                    removeEntity(test.id, deleteTest, 'tests', () =>
                      fetchData(getTests, 'tests')
                    )
                "
              ></IconButton>
              <TestDialog
                mode="edit"
                :error
                :test="newData.test"
                :universities
                :faculties
                :courses
                :subjects
                :onIconClick="
                  () => {
                    fetchData(getUniversities, 'universities');
                    fetchData(getCourses, 'courses');
                    fetchData(getSubjects, 'subjects');
                    fetchData(getFaculties, 'faculties');
                    getTestData(test.id!)
                  }
                "
                :onSubmit="() => editTst(test.id!, {
                  name: newData.test.name,
                  isVerified: newData.test.isVerified,
                  courseId: Number(newData.test.courseId),
                  facultyId: Number(newData.test.facultyId),
                  universityId: Number(newData.test.universityId),
                  subjectId: Number(newData.test.subjectId,)
                })"
              />
            </div>
          </Card>
        </div>
      </template>
    </AccordionItem>

    <AccordionItem value="questions">
      <template #title>Питання</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <div
            class="flex flex-col w-full h-fit box-border rounded-lg border dark:border-fiord-700 dark:bg-fiord-900"
          >
            <div
              class="flex w-full justify-between items-center border-b rounded-t-lg border-b-fiord-200 dark:border-b-fiord-700 p-2 dark:bg-fiord-900 bg-fiord-50 flex-col md:flex-row"
            >
              <div class="flex gap-1">
                <SelectRoot v-model="selectedTest">
                  <SelectTrigger placeholder="Виберіть тест" />
                  <SelectContent>
                    <template v-if="tests?.length">
                      <SelectItem
                        v-for="(test, index) in tests"
                        :key="index"
                        :value="test.id!.toString()"
                      >
                        {{ test.name }}
                      </SelectItem>
                    </template>
                    <span v-else class="p-3 text-center">
                      <Text
                        v-show="!tests?.length"
                        size="subtitle"
                        class="select-none"
                        >Тести відсутні</Text
                      >
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
                    <TooltipContent
                      >Перезавантажити список тестів</TooltipContent
                    >
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
                    <TooltipContent
                      >Додати тайтл питання (Alt + 1)</TooltipContent
                    >
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
                    <Button
                      @click="onClick"
                      size="md"
                      :disabled="isSubmitDisabled"
                    >
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

          <Card v-for="question in questions" :key="question.id">
            <span>ID: {{ question.id }}</span>
            <span>Назва: {{ question.name }}</span>
            <span>Відповідь: {{ question.answer }}</span>
            <span>Верифікація: {{ question.isVerified ? '+' : '-' }}</span>
            <span>ID тесту: {{ question.testId }}</span>
            <div class="flex items-center gap-1">
              <IconButton
                variant="danger"
                icon="ph:trash"
                @click="
                  question.id &&
                    removeEntity(question.id, deleteQuestion, 'questions', () =>
                      fetchData(getQuestions, 'questions')
                    )
                "
              ></IconButton>
              <QuestionDialog
                mode="edit"
                :error
                :question="newData.question"
                :tests
                :onIconClick="
                  () => {
                    fetchData(getFaculties, 'questions');
                    getQuestionData(question.id!)
                  }
                "
                :onSubmit="() => editQuestio(question.id!, {
                  name: newData.question.name,
                  answer: newData.question.answer,
                  isVerified: newData.question.isVerified,
                  testId: Number(newData.question.testId),

                })"
              />
            </div>
          </Card>
        </div>
      </template>
    </AccordionItem>
  </AccordionRoot>
</template>
<style scoped>
.textarea {
  field-sizing: content;
  min-height: 4lh;
}
</style>
