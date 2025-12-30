import z from 'zod';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = ['application/pdf'];

export const applicationSchema = z
  .object({
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
    careerType: z.enum(['NEW', 'CAREER'], { message: '경력을 선택해주세요.' }),
    careerYears: z.number().optional(),
    resumeFile: z
      .any()
      .refine((file) => file, '이력서 및 경력기술서를 첨부해주세요.'),
    portfolioFile: z.any().optional(),
    personalInfoConsent: z.boolean().refine((value) => value, {
      message: '필수 항목에 동의해주세요.',
    }),
    agreedAt: z.string().optional().describe('동의 일시 (ISO8601)'),
  })
  .superRefine((data, ctx) => {
    if (data.careerType === 'CAREER' && data.careerYears == null) {
      ctx.addIssue({
        code: 'custom',
        message: '경력 년수를 입력해주세요.',
        path: ['careerYears'],
      });
    }
  });

export type ApplicationFormData = z.infer<typeof applicationSchema>;
