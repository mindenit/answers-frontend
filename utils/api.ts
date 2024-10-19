import type { AsyncDataOptions } from '#app';
import type {
  ApiMessage,
  Course,
  Faculty,
  LoginRequest,
  LoginResponse,
  Question,
  SignupRequest,
  Subject,
  Test,
  TestRequest,
  TestResponse,
  University,
  UserResponse,
} from '~/types';

export const authMessages = {
  invalidEmailOrPassword: 'Invalid email or password',
  userAlreadyExists: 'User with such email already exists',
  userCreationFailed: 'User creation failed',
  logoutSuccessful: 'Logout successful',
  userNotFound: 'User with such id not found',
};

export async function getSubjects(options?: AsyncDataOptions<Subject[]>) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<Subject[]>(
    () => $fetch(`${config.public.apiBaseUrl}/subjects`),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function getUniversities(
  options?: AsyncDataOptions<University[]>
) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<
    University[]
  >(() => $fetch(`${config.public.apiBaseUrl}/universities`), options);
  return { data, status, error, refresh, clear };
}

export async function getQuestions(options?: AsyncDataOptions<Question[]>) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<
    Question[]
  >(() => $fetch(`${config.public.apiBaseUrl}/questions`), options);
  return { data, status, error, refresh, clear };
}

export async function getTests(
  params?: TestRequest,
  options?: AsyncDataOptions<TestResponse>
) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } =
    await useAsyncData<TestResponse>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/tests`, {
          params,
        }),
      options
    );
  return { data, status, error, refresh, clear };
}

export async function getCourses(options?: AsyncDataOptions<Course[]>) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<Course[]>(
    () => $fetch(`${config.public.apiBaseUrl}/courses`),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function getFaculties(options?: AsyncDataOptions<Faculty[]>) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<Faculty[]>(
    () => $fetch(`${config.public.apiBaseUrl}/faculties`),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function getUserInfo(options?: AsyncDataOptions<UserResponse>) {
  const config = useRuntimeConfig();
  const user = useCookie('user');

  const { data, status, error, refresh, clear } =
    await useAsyncData<UserResponse>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/me`, {
          headers: {
            Authorization: `Bearer ${user.value}`,
          },
        }),
      options
    );

  return { data, status, error, refresh, clear };
}

export async function createTest(body: Test, options?: AsyncDataOptions<Test>) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Test>(() =>
    $fetch(`${config.public.apiBaseUrl}/tests`, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${user.value}`,
      },
    })
  );
  return { data, status, error, refresh, clear };
}

// TODO: After the backend is fixed, types should be added here
export async function createQuestions(
  testId: number | string,
  questions: Question[],
  options?: Object
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData(
    () =>
      $fetch(`${config.public.apiBaseUrl}/tests/${testId}/questions`, {
        method: 'POST',
        body: questions,
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function createUniversity(
  payload: University,
  options?: AsyncDataOptions<University>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } =
    await useAsyncData<University>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/universities`, {
          method: 'POST',
          body: payload,
          headers: {
            Authorization: `Bearer ${user.value}`,
          },
        }),
      options
    );
  return { data, status, error, refresh, clear };
}

export async function createFaculty(
  payload: Faculty,
  options?: AsyncDataOptions<Faculty>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Faculty>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/faculties`, {
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function createCourse(
  payload: Course,
  options?: AsyncDataOptions<Course>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Course>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/courses`, {
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function createSubject(
  payload: Subject,
  options?: AsyncDataOptions<Subject>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Subject>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/subjects`, {
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function deleteUniversity(
  id: string | number,
  options?: AsyncDataOptions<University>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } =
    await useAsyncData<University>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/universities/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.value}`,
          },
        }),
      options
    );
  return { data, status, error, refresh, clear };
}

export async function deleteCourse(
  id: string | number,
  options?: AsyncDataOptions<Course>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Course>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function deleteFaculty(
  id: string | number,
  options?: AsyncDataOptions<Faculty>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Faculty>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/faculties/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function deleteSubject(
  id: string | number,
  options?: AsyncDataOptions<Subject>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Subject>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/subjects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function deleteTest(
  id: string | number,
  options?: AsyncDataOptions<Test>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Test>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/tests/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function deleteQuestion(
  id: string | number,
  options?: AsyncDataOptions<Question>
) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } = await useAsyncData<Question>(
    () =>
      $fetch(`${config.public.apiBaseUrl}/questions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      }),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function login(
  payload: LoginRequest,
  options?: AsyncDataOptions<LoginResponse>
) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } =
    await useAsyncData<LoginResponse>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/login`, {
          method: 'POST',
          body: payload,
        }),
      options
    );
  if (data.value !== null) {
    const user = useCookie('user');
    user.value = data.value!.access_token;
  }
  return { data, status, error, refresh, clear };
}

export async function signup(
  payload: SignupRequest,
  options?: AsyncDataOptions<UserResponse>
) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } =
    await useAsyncData<UserResponse>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/signup`, {
          method: 'POST',
          body: payload,
        }),
      options
    );
  if (!error.value) {
    await login({
      email: payload.email,
      password: payload.password,
    });
  }
  return { data, status, error, refresh, clear };
}

export async function logout(options?: AsyncDataOptions<ApiMessage>) {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } =
    await useAsyncData<ApiMessage>(
      () =>
        $fetch(`${config.public.apiBaseUrl}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.value}`,
          },
        }),
      options
    );
  return { data, status, error, refresh, clear };
}
