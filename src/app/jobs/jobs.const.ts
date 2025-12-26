import { CareerType, JobCategory } from '../types/recruitment.type';

export const JOB_CATEGORY_LABEL: Record<JobCategory, string> = {
  FRONTEND: '개발',
  BACKEND: '개발',
  MOBILE: '개발',
  DATA: '개발',
  DESIGN: '디자인',
  PRODUCT: '기획',
  MARKETING: '마케팅',
  SALES: '영업',
  HR: '인사',
  ETC: '기타',
};

export const CAREER_TYPE_LABEL: Record<CareerType, string> = {
  NEW: '신입',
  CAREER: '경력',
  BOTH: '무관',
};
