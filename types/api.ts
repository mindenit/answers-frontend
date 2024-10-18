interface BaseModel {
  id: number;
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
}

interface University extends BaseModel {
  name: string;
  brief: string;
}

interface LoginResponse {
  access_token: string;
}

interface UserResponse extends BaseModel {
  username: string;
  role: string;
  email: string;
}

interface ApiMessage {
  message: string;
}

export type {
  ApiMessage,
  Course,
  Faculty,
  LoginResponse,
  Question,
  Subject,
  Test,
  TestMeta,
  TestRequest,
  TestResponse,
  University,
  UserResponse,
};
