import type {
  Strapi4ResponseMany,
  Strapi4ResponseSingle,
} from '@nuxtjs/strapi';

interface BaseModel {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

interface Course extends BaseModel {
  number: number;
  // TODO: Change to Test model interface when will be added
  tests: Strapi4ResponseMany<Test>;
}

interface Faculty extends BaseModel {
  name: string;
  university: Strapi4ResponseSingle<University>;
}

interface Subject extends BaseModel {
  name: string;
  brief: string;
  university: Strapi4ResponseSingle<University>;
}

interface Test extends BaseModel {
  name: string;
  verified: boolean;
  course: Strapi4ResponseSingle<Course>;
  subject: Strapi4ResponseSingle<Subject>;
  faculties: Strapi4ResponseMany<Faculty>;
  questions: Strapi4ResponseMany<Question>;
  university: Strapi4ResponseSingle<University>;
}

interface Question extends BaseModel {
  name: string;
  answer: string;
  verified: boolean;
  test: Strapi4ResponseSingle<Test>;
}

interface University extends BaseModel {
  name: string;
  brief: string;
}

export type { Course, Faculty, Question, Subject, Test, University };
