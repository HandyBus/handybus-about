import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getJobPostings } from '@/app/services/recruitment.service';
import { CAREER_TYPE_LABEL, JOB_CATEGORY_LABEL } from '@/app/jobs/jobs.const';
import JobDescription from './components/JobDescription';
import Footer from '@/components/footer/Footer';

interface Props {
  params: { postingId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postingId } = params;
  try {
    const jobPostings = await getJobPostings();
    const job = jobPostings.find((job) => job.id === postingId);

    if (!job) {
      return {
        title: '존재하지 않는 공고',
        description: '찾으시는 공고가 없습니다.',
      };
    }

    return {
      title: job.title,
      description: job.description.slice(0, 100),
    };
  } catch {
    return {
      title: '채용 공고 상세',
      description: '핸디버스의 여정을 함께 할 동료를 찾습니다.',
    };
  }
}

const Page = async ({ params }: Props) => {
  const { postingId } = params;

  const jobPostings = await getJobPostings();
  const job = jobPostings.find((job) => job.id === postingId);

  if (!job) {
    notFound();
  }

  return (
    <>
      <section className="container-padding my-64 flex flex-col justify-between gap-40 tablet:my-80 desktop:my-120 desktop:flex-row">
        {/* 공고 상세 */}
        <section className="order-2 flex flex-col gap-32 desktop:order-1">
          <h1 className="text-[38px] font-600 leading-[140%]">{job.title}</h1>
          <JobDescription description={job.description} />
        </section>

        {/* 직군/경력 섹션 */}
        <section className="order-1 h-fit rounded-16 border border-basic-grey-200 px-16 py-24 desktop:order-2 desktop:w-[306px]">
          <div className="flex gap-32 px-16 text-20 font-500 leading-[160%]">
            <h2 className="whitespace-nowrap">직군</h2>
            <p>{JOB_CATEGORY_LABEL[job.jobCategory]}</p>
          </div>
          <Divider />
          <div className="flex gap-32 px-16 text-20 font-500 leading-[160%]">
            <h2 className="whitespace-nowrap">경력</h2>
            <p>{CAREER_TYPE_LABEL[job.careerType]}</p>
          </div>
          <Link
            href={`/jobs/${job.id}/write`}
            className="mt-24 hidden w-full rounded-8 bg-brand-primary-400 px-16 py-12 text-center text-16 font-600 leading-[160%] text-basic-white desktop:block"
          >
            지원하기
          </Link>
        </section>
      </section>

      <div className="container-padding fixed bottom-0 left-0 right-0 z-10 bg-basic-white pb-24 pt-8 desktop:hidden">
        <Link
          href={`/jobs/${job.id}/write`}
          className="block w-full rounded-8 bg-brand-primary-400 px-16 py-12 text-center text-16 font-600 leading-[160%] text-basic-white"
        >
          지원하기
        </Link>
      </div>

      <div className="hidden desktop:block">
        <Footer />
      </div>
    </>
  );
};

export default Page;

const Divider = () => {
  return <div className="my-16 h-[1px] w-full bg-basic-grey-200" />;
};
