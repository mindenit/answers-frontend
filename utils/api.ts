import type {
  Course,
  Faculty,
  Question,
  TestRequest,
  TestResponse,
} from '~/types';

export async function getQuestions(options?: Object) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<
    Question[]
  >(() => $fetch(`${config.public.apiBaseUrl}/questions`), options);
  return { data, status, error, refresh, clear };
}

export async function getTests(params?: TestRequest, requestOptions?: Object) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } =
    await useAsyncData<TestResponse>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/tests`, {
          params,
        }),
      requestOptions
    );
  return { data, status, error, refresh, clear };
}

export async function getCourses(requestOptions?: Object) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<Course[]>(
    () => $fetch(`${config.public.apiBaseUrl}/courses`),
    requestOptions
  );
  return { data, status, error, refresh, clear };
}

export async function getFaculties(requestOptions?: Object) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<Faculty[]>(
    () => $fetch(`${config.public.apiBaseUrl}/faculties`),
    requestOptions
  );
  return { data, status, error, refresh, clear };
}

export async function createTest(body: {
  name: string;
  isVerified: boolean;
  universityId: number;
  facultyId: number;
  subjectId: number;
  courseId: number;
}) {
  const config = useRuntimeConfig();
  try {
    const response = await $fetch(`${config.public.apiBaseUrl}/tests`, {
      method: 'POST',
      body,
    });
    return { data: response, status: 'success' };
  } catch (error) {
    return { error, status: 'error' };
  }
}

export async function createQuestion(body: Question) {
  const config = useRuntimeConfig();
  try {
    const response = await $fetch(`${config.public.apiBaseUrl}/questions`, {
      method: 'POST',
      body,
    });
    return { data: response, status: 'success' };
  } catch (error) {
    return { error, status: 'error' };
  }
}
