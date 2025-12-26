import z from 'zod';
import {
  CareerType,
  JobCategory,
  JobPostingsEntitySchema,
} from '../types/recruitment.type';
import { instance } from './config';
import { toSearchParams } from '@/utils/searchParams.util';

/**
 * orderBy와 additionalOrderOptions는 항상 함께 전달해야 합니다.
 * 초기 orderBy는 PK 기반 내림차순 정렬이며 orderBy에서 동일한 값이 존재할 경우 PK의 내림차순으로 2차정렬 합니다.
 * PK가 auto_increment 칼럼인 경우 최신순 정렬로 동작합니다.
 * orderBy 쿼리는 쿼리퍼포먼스가 좋지 않기 때문에 초기 페이지 렌더링 시 기본값으로는 사용하지 않기를 권장드립니다.
 */
interface PaginationOptions {
  orderBy?: 'title' | 'createdAt' | 'closedAt' | 'isOpen';
  additionalOrderOptions?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

interface GetJobPostingsOptions {
  jobCategory?: JobCategory;
  careerType?: CareerType;
  isOpen?: boolean;
  title?: string;
}

export const getJobPostings = async (
  options?: GetJobPostingsOptions & PaginationOptions,
) => {
  const searchParams = toSearchParams(options);
  const res = await instance.get(
    `/v1/recruitment/job-postings?${searchParams.toString()}`,
    {
      shape: {
        jobPostings: z.array(JobPostingsEntitySchema),
      },
    },
  );
  return res.jobPostings;
};
