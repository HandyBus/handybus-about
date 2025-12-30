import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '지원 완료',
  description: '핸디버스의 여정을 함께 할 동료를 찾습니다.',
};

const Page = () => {
  return (
    <section className="container-padding py-64 tablet:py-80 desktop:mx-auto desktop:w-full desktop:max-w-[792px] desktop:py-120">
      <div className="flex flex-col items-start gap-24 ">
        <div className="flex flex-col gap-8">
          <h2 className="text-24 font-600 leading-[140%]">
            지원이 완료되었습니다.
          </h2>
          <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
            지원해주셔서 감사합니다! 빠르게 검토하고 연락드릴게요.
          </p>
        </div>
        <Link
          href="/jobs"
          className="w-fit rounded-8 bg-brand-primary-400 px-16 py-12 text-16 font-600 leading-[160%] text-basic-white"
        >
          돌아가기
        </Link>
      </div>
    </section>
  );
};

export default Page;
