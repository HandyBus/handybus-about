import z from 'zod';

// NOTE: swagger에 스키마가 제대로 표기되지 않아 api 레포의 코드를 참고하여 작성하였습니다. 따라서 실제 스키마와 다를 수 있습니다.

export const JobCategoryEnum = z.enum([
  'FRONTEND',
  'BACKEND',
  'MOBILE',
  'DATA',
  'DESIGN',
  'PRODUCT',
  'MARKETING',
  'SALES',
  'HR',
  'ETC',
]);
export type JobCategory = z.infer<typeof JobCategoryEnum>;

export const CareerTypeEnum = z.enum(['CAREER', 'NEW', 'BOTH']);
export type CareerType = z.infer<typeof CareerTypeEnum>;

export const JobApplicationTypeEnum = z.enum(['JOB', 'TALENT_POOL']);
export type JobApplicationType = z.infer<typeof JobApplicationTypeEnum>;
export const JobApplicationStatusEnum = z.enum([
  'SUBMITTED',
  'REVIEWING',
  'PASSED',
  'REJECTED',
]);
export type JobApplicationStatus = z.infer<typeof JobApplicationStatusEnum>;

export const JobPostingResponseModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  jobCategory: JobCategoryEnum,
  careerType: CareerTypeEnum,
  minCareerYears: z.number(),
  maxCareerYears: z.number().nullable(),
  description: z.string(),
  closeAt: z.date().nullable(),
  isOpen: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type JobPostingResponseModel = z.infer<
  typeof JobPostingResponseModelSchema
>;
