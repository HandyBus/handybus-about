import Image from 'next/image';
import TopImage from './images/2x-jobs-top-image.png';
import Link from 'next/link';
import { Metadata } from 'next';
import { getJobPostings } from '../services/recruitment.service';
import { getDDay, formatDate } from './jobs.utils';
import { JOB_CATEGORY_LABEL, CAREER_TYPE_LABEL } from './jobs.const';
import { JobPostingResponseModel } from '../types/recruitment.type';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: '채용 공고',
  description: '핸디버스의 여정을 함께 할 동료를 찾습니다.',
};

const Page = async () => {
  const jobPostings = await getJobPostings({
    isOpen: true,
    orderBy: 'createdAt',
    additionalOrderOptions: 'DESC',
  });

  return (
    <section className="flex flex-col gap-64 tablet:gap-80 desktop:gap-120">
      {/* 상단 이미지 */}
      <section className="relative w-full">
        <figure className="relative h-[380px] w-full">
          <Image
            src={TopImage}
            alt="상단 이미지"
            fill
            className="object-cover object-right"
            placeholder="blur"
            priority={true}
          />
        </figure>
        <h1 className="absolute left-1/2 top-[190px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[34px] font-600 leading-[140%] text-basic-white">
          핸디버스의 여정을
          <br />
          함께 할 동료를 찾습니다.
        </h1>
      </section>

      {/* 채용 공고 */}
      <section className="container-padding flex flex-col gap-32 tablet:mx-auto tablet:w-full tablet:max-w-[792px]">
        <h2 className="text-24 font-600 leading-[140%]">
          {jobPostings?.length}개의 포지션이 열려있어요
        </h2>

        <section>
          {jobPostings?.map((job: JobPostingResponseModel, index) => (
            <div key={job.id}>
              <Link href={`/jobs/${job.id}`} className="flex justify-between">
                <div>
                  <h3 className="text-24 font-600 leading-[140%]">
                    {job.title}
                  </h3>
                  <p className="text-14 font-500 leading-[140%] text-basic-grey-700">
                    {JOB_CATEGORY_LABEL[job.jobCategory]} |{' '}
                    {CAREER_TYPE_LABEL[job.careerType]}
                  </p>
                </div>
                <div className="flex flex-col justify-center text-right">
                  <p className="text-24 font-600 leading-[140%]">
                    {getDDay(job.closeAt)}
                  </p>
                  <p className="whitespace-nowrap text-14 font-500 leading-[140%] text-basic-grey-700">
                    {job.closeAt ? `~ ${formatDate(job.closeAt)}` : '상시 채용'}
                  </p>
                </div>
              </Link>
              {index !== jobPostings.length - 1 && <Divider />}
            </div>
          ))}
        </section>
      </section>

      {/* 인재풀 등록 */}
      <section className="container-padding mb-64 flex flex-col gap-24 rounded-16 bg-basic-grey-50 px-24 py-40 tablet:mx-auto tablet:mb-80 tablet:w-full tablet:max-w-[792px] desktop:mb-120">
        <section className="flex flex-col gap-16">
          <h2 className="text-center text-24 font-600 leading-[140%]">
            인재풀 등록
          </h2>
          <p className="text-center text-16 font-500 leading-[140%] text-basic-grey-700">
            채용 진행중인 포지션 외에도 언제든지 인재 등록 또는 커피챗을 신청
            하실 수 있습니다.
          </p>
        </section>
        <section className="flex justify-center">
          <Link
            href="/jobs/talentPool"
            className="rounded-8 bg-brand-primary-400 px-16 py-12 text-basic-white"
          >
            등록하기
          </Link>
        </section>
      </section>

      <Footer />
    </section>
  );
};

export default Page;

const Divider = () => {
  return <div className="my-24 h-[1px] w-full bg-basic-grey-200" />;
};
