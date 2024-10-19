<script lang="ts" setup>
import { Button, Heading, IconButton } from '@mindenit/ui';

definePageMeta({
  // middleware: 'admin',
});

useSeoMeta({
  title: 'Перегляд | Answers',
});

const { data: testData, status: testsStatus } = await getTests();
const { data: universityData, status: universitiesStatus } =
  await getUniversities();
const { data: facultyData, status: facultiesStatus } = await getFaculties();
const { data: subjectData, status: subjectsStatus } = await getSubjects();
const { data: courseData, status: coursesStatus } = await getCourses();
const { data: questionData, status: questionsStatus } = await getQuestions();

const universities = ref(universityData.value);
const faculties = ref(facultyData.value);
const courses = ref(courseData.value);
const subjects = ref(subjectData.value);
const tests = ref(testData.value);
const questions = ref(questionData.value);

async function removeUniversity(id: number) {
  await deleteUniversity(id);
  const { data: universityData, status: universitiesStatus } =
    await getUniversities();
  universities.value = universityData.value;
}

async function removeCourse(id: number) {
  await deleteCourse(id);
  const { data: courseData, status: coursesStatus } = await getCourses();
  courses.value = courseData.value;
}

async function removeFaculty(id: number) {
  await deleteFaculty(id);
  const { data: facultyData, status: facultiesStatus } = await getFaculties();
  faculties.value = facultyData.value;
}

async function removeSubject(id: number) {
  await deleteSubject(id);
  const { data: subjectData, status: subjectsStatus } = await getSubjects();
  subjects.value = subjectData.value;
}

async function removeTest(id: number) {
  await deleteTest(id);
  const { data: testData, status: testsStatus } = await getTests();
  tests.value = testData.value;
}

async function removeQuestion(id: number) {
  await deleteQuestion(id);
  const { data: questionData, status: questionsStatus } = await getQuestions();
  questions.value = questionData.value;
}
</script>
<template>
  <div class="flex flex-col items-center gap-2">
    <Heading size="medium">Адмін панель</Heading>
    <Button asChild>
      <NuxtLink to="/admin">До головної сторінки адмінки</NuxtLink>
    </Button>
  </div>
  <div v-if="universities">
    <Heading size="small" class="text-lg font-semibold mb-4"
      >Університети</Heading
    >
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">Назва</th>
          <th class="px-4 py-2 border border-gray-300">Коротка назва</th>
          <th class="px-4 py-2 border border-gray-300"></th>
          <th class="px-4 py-2 border border-gray-300"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="university in universities" :key="university.id">
          <td class="px-4 py-2 border border-gray-300">{{ university.id }}</td>
          <td class="px-4 py-2 border border-gray-300">
            {{ university.name }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            {{ university.brief }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton
              variant="danger"
              icon="ph:trash"
              @click="university.id && removeUniversity(university.id)"
            ></IconButton>
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton icon="ph:pen"></IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="courses" class="my-2">
    <Heading size="small" class="text-lg font-semibold mb-4">Курси</Heading>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">Номер курсу</th>
          <th class="px-4 py-2 border border-gray-300"></th>
          <th class="px-4 py-2 border border-gray-300"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td class="px-4 py-2 border border-gray-300">{{ course.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ course.number }}</td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton
              variant="danger"
              icon="ph:trash"
              @click="course.id && removeCourse(course.id)"
            ></IconButton>
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton icon="ph:pen"></IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="faculties" class="my-2">
    <Heading size="small" class="text-lg font-semibold mb-4"
      >Факультети</Heading
    >
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">Назва</th>
          <th class="px-4 py-2 border border-gray-300">ID університету</th>
          <th class="px-4 py-2 border border-gray-300"></th>
          <th class="px-4 py-2 border border-gray-300"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="faculty in faculties" :key="faculty.id">
          <td class="px-4 py-2 border border-gray-300">{{ faculty.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ faculty.name }}</td>
          <td class="px-4 py-2 border border-gray-300">
            {{ faculty.universityId }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton
              variant="danger"
              icon="ph:trash"
              @click="faculty.id && removeFaculty(faculty.id)"
            ></IconButton>
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton icon="ph:pen"></IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="subjects" class="my-2">
    <Heading size="small" class="text-lg font-semibold mb-4">Предмети</Heading>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">Назва</th>
          <th class="px-4 py-2 border border-gray-300">Коротка назва</th>
          <th class="px-4 py-2 border border-gray-300">ID факультету</th>
          <th class="px-4 py-2 border border-gray-300"></th>
          <th class="px-4 py-2 border border-gray-300"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subject in subjects" :key="subject.id">
          <td class="px-4 py-2 border border-gray-300">{{ subject.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ subject.name }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ subject.brief }}</td>
          <td class="px-4 py-2 border border-gray-300">
            {{ subject.facultyId }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton
              variant="danger"
              icon="ph:trash"
              @click="subject.id && removeSubject(subject.id)"
            ></IconButton>
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton icon="ph:pen"></IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="tests" class="my-2">
    <Heading size="small" class="text-lg font-semibold mb-4">Tests</Heading>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">Назва</th>
          <th class="px-4 py-2 border border-gray-300">Верифікація</th>
          <th class="px-4 py-2 border border-gray-300">ID факультету</th>
          <th class="px-4 py-2 border border-gray-300">ID курсу</th>
          <th class="px-4 py-2 border border-gray-300">ID предмету</th>
          <th class="px-4 py-2 border border-gray-300"></th>
          <th class="px-4 py-2 border border-gray-300"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="test in tests.data" :key="test.id">
          <td class="px-4 py-2 border border-gray-300">{{ test.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ test.name }}</td>
          <td class="px-4 py-2 border border-gray-300">
            {{ test.isVerified }}
          </td>
          <td class="px-4 py-2 border border-gray-300">{{ test.facultyId }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ test.courseId }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ test.subjectId }}</td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton
              variant="danger"
              icon="ph:trash"
              @click="test.id && removeTest(test.id)"
            ></IconButton>
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton icon="ph:pen"></IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Questions Table -->
  <div v-if="questions" class="my-2">
    <Heading size="small" class="text-lg font-semibold mb-4">Питання</Heading>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">Назва</th>
          <th class="px-4 py-2 border border-gray-300">Відповідь</th>
          <th class="px-4 py-2 border border-gray-300">Верифікація</th>
          <th class="px-4 py-2 border border-gray-300">ID тесту</th>
          <th class="px-4 py-2 border border-gray-300"></th>
          <th class="px-4 py-2 border border-gray-300"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question.id">
          <td class="px-4 py-2 border border-gray-300">{{ question.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ question.name }}</td>
          <td class="px-4 py-2 border border-gray-300">
            {{ question.answer }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            {{ question.isVerified }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            {{ question.testId }}
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton
              variant="danger"
              icon="ph:trash"
              @click="question.id && removeQuestion(question.id)"
            ></IconButton>
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <IconButton icon="ph:pen"></IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
