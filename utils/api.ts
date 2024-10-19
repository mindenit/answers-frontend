import type {
  ApiMessage,
  Course,
  Faculty,
  LoginResponse,
  Question,
  Subject,
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

export async function getSubjects(options?: Object) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<Subject[]>(
    () => $fetch(`${config.public.apiBaseUrl}/subjects`),
    options
  );
  return { data, status, error, refresh, clear };
}

export async function getUniversities(options?: Object) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData<
    University[]
  >(() => $fetch(`${config.public.apiBaseUrl}/universities`), options);
  return { data, status, error, refresh, clear };
}

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

export async function getUserInfo() {
  const config = useRuntimeConfig();
  const user = useCookie('user');

  const { data, status, error, refresh, clear } =
    await useAsyncData<UserResponse>(() =>
      $fetch(`${config.public.apiBaseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      })
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
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/tests`, {
      method: 'POST',
      body,
    })
  );
  return { data, status, error, refresh, clear };
}

export async function createQuestions(
  testId: number | string,
  questions: Question[]
) {
  const config = useRuntimeConfig();

  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/tests/${testId}/questions`, {
      method: 'POST',
      body: questions,
    })
  );
  return { data, status, error, refresh, clear };
}

export async function createUniversity(payload: University) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/universities`, {
      method: 'POST',
      body: payload,
    })
  );
  return { data, status, error, refresh, clear };
}

export async function createFaculty(payload: Faculty) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/faculties`, {
      method: 'POST',
      body: payload,
    })
  );
  return { data, status, error, refresh, clear };
}

export async function createCourse(payload: Course) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/courses`, {
      method: 'POST',
      body: payload,
    })
  );
  return { data, status, error, refresh, clear };
}

export async function createSubject(payload: Subject) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/subjects`, {
      method: 'POST',
      body: payload,
    })
  );
  return { data, status, error, refresh, clear };
}

export async function deleteUniversity(id: string | number) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/universities/${id}`, {
      method: 'DELETE',
    })
  );
  return { data, status, error, refresh, clear };
}

export async function deleteCourse(id: string | number) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/courses/${id}`, {
      method: 'DELETE',
    })
  );
  return { data, status, error, refresh, clear };
}

export async function deleteFaculty(id: string | number) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/faculties/${id}`, {
      method: 'DELETE',
    })
  );
  return { data, status, error, refresh, clear };
}

export async function deleteSubject(id: string | number) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/subjects/${id}`, {
      method: 'DELETE',
    })
  );
  return { data, status, error, refresh, clear };
}

export async function deleteTest(id: string | number) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/tests/${id}`, {
      method: 'DELETE',
    })
  );
  return { data, status, error, refresh, clear };
}

export async function deleteQuestion(id: string | number) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } = await useAsyncData(() =>
    $fetch(`${config.public.apiBaseUrl}/questions/${id}`, {
      method: 'DELETE',
    })
  );
  return { data, status, error, refresh, clear };
}

export async function login(payload: { email: string; password: string }) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } =
    await useAsyncData<LoginResponse>(() =>
      $fetch(`${config.public.apiBaseUrl}/login`, {
        method: 'POST',
        body: payload,
      })
    );
  if (data.value !== null) {
    const user = useCookie('user');
    user.value = data.value!.access_token;
  }
  return { data, status, error, refresh, clear };
}

export async function signup(payload: {
  username: string;
  email: string;
  password: string;
}) {
  const config = useRuntimeConfig();
  const { data, status, error, refresh, clear } =
    await useAsyncData<UserResponse>(() =>
      $fetch(`${config.public.apiBaseUrl}/signup`, {
        method: 'POST',
        body: payload,
      })
    );
  if (!error.value) {
    await login({
      email: payload.email,
      password: payload.password,
    });
  }
  return { data, status, error, refresh, clear };
}

export async function logout() {
  const config = useRuntimeConfig();
  const user = useCookie('user');
  const { data, status, error, refresh, clear } =
    await useAsyncData<ApiMessage>(() =>
      $fetch(`${config.public.apiBaseUrl}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.value}`,
        },
      })
    );
  return { data, status, error, refresh, clear };
}
