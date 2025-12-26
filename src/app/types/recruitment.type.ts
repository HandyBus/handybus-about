import z from 'zod';

export const JobCategorySchema = z.enum([
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
export type JobCategory = z.infer<typeof JobCategorySchema>;

export const CareerTypeSchema = z.enum(['CAREER', 'NEW', 'BOTH']);
export type CareerType = z.infer<typeof CareerTypeSchema>;

export const JobApplicationTypeSchema = z.enum(['JOB', 'TALENT_POOL']);
export type JobApplicationType = z.infer<typeof JobApplicationTypeSchema>;
export const JobApplicationStatusSchema = z.enum([
  'SUBMITTED',
  'REVIEWING',
  'PASSED',
  'REJECTED',
]);
export type JobApplicationStatus = z.infer<typeof JobApplicationStatusSchema>;

// NOTE: JobApplicationsEntity 엔터티는 서버의 DB/ORM 코드에 있습니다.
// 아래는 타입 정의 등 클라이언트 TS에서 사용하기 위한 간소화 버전입니다.
export const JobApplicationsEntitySchema = z.object({
  id: z.number(),
  jobPostingId: z.string().nullable(),
  applicantId: z.string(),
  applicationType: JobApplicationTypeSchema,
  customJobTitle: z.string().nullable(),
  resumeFile: z.string(),
  portfolioFile: z.string().nullable(),
  personalInfoConsent: z.boolean(),
  agreedAt: z.string().nullable(), // string or Dayjs, adjust as needed in app
  status: JobApplicationStatusSchema,
  // 관계형 데이터: 필요시 더 추가 가능
  // 예: jobPosting?: JobPostingsEntity | null;
  // 예: applicant?: ApplicantsEntity;
  // 예: talentPoolExtra?: TalentPoolExtrasEntity | null;
});

export const JobPostingsEntitySchema = z.object({
  id: z.number(),
  title: z.string(),
  jobCategory: JobCategorySchema,
  careerType: CareerTypeSchema,
  minCareerYears: z.number(),
  maxCareerYears: z.number().nullable(),
  description: z.string(),
  openAt: z.date(),
  closeAt: z.date().nullable(),
  isOpen: z.boolean(),
  jobApplications: z.array(JobApplicationsEntitySchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type JobPostingsEntity = z.infer<typeof JobPostingsEntitySchema>;
