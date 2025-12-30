import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJobPostings } from '@/app/services/recruitment.service';
import { ApplicationForm } from './components/ApplicationForm';

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
      };
    }

    return {
      title: `${job.title} - 지원하기`,
      description: '핸디버스의 여정을 함께 할 동료를 찾습니다.',
    };
  } catch {
    return {
      title: '지원하기',
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
    <section className="container-padding pb-64 pt-60 desktop:mx-auto desktop:w-full desktop:max-w-[792px] desktop:pt-120">
      <ApplicationForm jobTitle={job.title} postingId={postingId} />
    </section>
  );
};

export default Page;
