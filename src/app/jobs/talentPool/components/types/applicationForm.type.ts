import z from 'zod';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = ['application/pdf'];

export const applicationSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  contact: z
    .string()
    .min(1, '연락처를 입력해주세요.')
    .regex(
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
      '올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)',
    ),
  email: z
    .email('올바른 이메일 형식이 아닙니다.')
    .min(1, '이메일을 입력해주세요.'),
  jobTitle: z.string().min(1, '직무를 입력해주세요.'),
  resumeFile: z
    .any()
    .refine((file) => file, '이력서 및 경력기술서를 첨부해주세요.'),
  portfolioFile: z.any().optional(),
  wantsCoffeeChat: z.boolean().optional(),
  messageToTeam: z.string().optional(),
  agreedAt: z.string().optional(),
  agreeMandatory1: z.boolean().refine((value) => value, {
    message: '필수 항목에 동의해주세요.',
  }),
  agreeOptional1: z.boolean().optional(),
  agreeOptional2: z.boolean().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
