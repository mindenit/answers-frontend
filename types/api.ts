interface BaseModel {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Question extends BaseModel {
  name: string;
  answer: string;
  isVerified: boolean;
  testId?: number;
}

interface Course extends BaseModel {
  number: number;
}

interface Faculty extends BaseModel {
  name: string;
  universityId: number;
}

interface Subject extends BaseModel {
  name: string;
  brief: string;
  facultyId: number;
}

interface Test extends BaseModel {
  name: string;
  isVerified: boolean;
  facultyId: number;
  courseId: number;
  subjectId: number;
  universityId: number;
}

interface TestMeta {
  count: number;
  pageSize: number;
}

interface TestResponse {
  data: Test[];
  meta: TestMeta;
}

interface TestRequest {
  offset?: number;
  limit?: number;
  name?: string;
  verified?: boolean;
  facultyId?: number;
  courseId?: number;
  universityId?: number;
}

interface TestInfoResponse extends BaseModel {
  name: string;
  isVerified: boolean;
  universityId: number;
  facultyId: number;
  subjectId: number;
  courseId: number;
  course: Course;
  questions: Question[];
  faculty: Faculty;
  university: University;
  subject: Subject;
}

interface University extends BaseModel {
  name: string;
  brief: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface UserResponse extends BaseModel {
  username: string;
  role: 'admin' | 'user';
  email: string;
}

interface ApiMessage {
  message: string;
}

export type {
  ApiMessage,
  Course,
  Faculty,
  LoginRequest,
  LoginResponse,
  Question,
  SignupRequest,
  Subject,
  Test,
  TestInfoResponse,
  TestMeta,
  TestRequest,
  TestResponse,
  University,
  UserResponse,
};
