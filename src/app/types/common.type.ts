import z from 'zod';

export const ContactSchema = z.object({
  id: z.string().describe('협업문의 ID'),
  name: z.string().describe('이름'),
  company: z.string().describe('소속'),
  phoneNumber: z.string().describe('전화번호'),
  email: z.string().describe('이메일'),
  title: z.string().describe('제목'),
  content: z.string().describe('내용'),
  createdAt: z.string().describe('생성일'),
  updatedAt: z.string().describe('수정일'),
});

export type Contact = z.infer<typeof ContactSchema>;
