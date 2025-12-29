import { Metadata } from 'next';
import { ApplicationForm } from './components/ApplicationForm';

export const metadata: Metadata = {
  title: '인재풀 등록',
  description: '핸디버스의 여정을 함께 할 동료를 찾습니다.',
};

const Page = async () => {
  return (
    <section className="container-padding pb-64 pt-60 desktop:mx-auto desktop:w-full desktop:max-w-[792px] desktop:pt-120">
      <ApplicationForm />
    </section>
  );
};

export default Page;
