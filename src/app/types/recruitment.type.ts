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

export const CreateJobApplicationRequestSchema = z.object({
  jobPostingId: z
    .string()
    .nullable()
    .describe('채용 공고 ID (JOB 타입일 경우 필수)'),
  applicantName: z.string().describe('지원자 이름'),
  applicantPhoneNumber: z.string().describe('지원자 전화번호'),
  applicantEmail: z.string().describe('지원자 이메일'),
  applicantCareerYears: z.number().nullable().describe('지원자 경력 연수'),
  applicationType: z.enum(['JOB', 'TALENT_POOL']).describe('지원 유형'),
  customJobTitle: z
    .string()
    .nullable()
    .describe('커스텀 직무명 (TALENT_POOL 타입일 경우 필수)'),
  resumeFile: z.string().describe('이력서 파일 URL'),
  portfolioFile: z
    .string()
    .optional()
    .nullable()
    .describe('포트폴리오 파일 URL'),
  personalInfoConsent: z.boolean().describe('개인정보 동의 여부'),
  agreedAt: z.string().optional().nullable().describe('동의 일시 (ISO8601)'),
  wantsCoffeeChat: z
    .boolean()
    .optional()
    .nullable()
    .describe('커피챗 희망 여부'),
  messageToTeam: z
    .string()
    .optional()
    .nullable()
    .describe('팀에게 전하는 메시지'),
});

export type CreateJobApplicationRequest = z.infer<
  typeof CreateJobApplicationRequestSchema
>;
