'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-24">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-24 font-600 leading-[140%]">
          문제가 발생했습니다.
        </h2>
        <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
          알 수 없는 오류가 생겼습니다. 다시 시도해주세요.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="rounded-8 bg-brand-primary-400 px-16 py-12 text-16 font-600 leading-[160%] text-basic-white"
      >
        돌아가기
      </button>
    </div>
  );
}
