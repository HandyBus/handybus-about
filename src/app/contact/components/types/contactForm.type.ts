import z from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  company: z.string().min(1, '소속을 입력해주세요.'),
  phoneNumber: z
    .string()
    .min(1, '연락처를 입력해주세요.')
    .regex(
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
      '올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)',
    ),
  email: z.email('올바른 이메일 형식이 아닙니다.'),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
