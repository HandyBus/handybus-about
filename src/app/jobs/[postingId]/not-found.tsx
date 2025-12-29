import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-24">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-24 font-600 leading-[140%]">
          존재하지 않거나 마감된 공고입니다.
        </h2>
        <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
          아래 버튼을 눌러 목록으로 돌아가세요
        </p>
      </div>
      <Link
        href="/jobs"
        className="rounded-8 bg-brand-primary-400 px-16 py-12 text-16 font-600 leading-[160%] text-basic-white"
      >
        목록보기
      </Link>
    </div>
  );
};

export default NotFound;
