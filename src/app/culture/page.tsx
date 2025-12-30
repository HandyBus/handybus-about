import Image from 'next/image';
import TopImage from './images/top-image.png';
import Culture1Image from './images/2x-culture-card1.png';
import Culture2Image from './images/2x-culture-card2.png';
import Culture3Image from './images/2x-culture-card3.png';
import Culture4Image from './images/2x-culture-card4.png';
import Culture1ImageSmall from './images/2x-culture-card-small1.png';
import Culture2ImageSmall from './images/2x-culture-card-small2.png';
import Culture3ImageSmall from './images/2x-culture-card-small3.png';
import Culture4ImageSmall from './images/2x-culture-card-small4.png';
import { Metadata } from 'next';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: '팀 문화',
  description: '팬들의 설렘을 위해, 가장 치열하게 움직이는 동료들',
};

const CULTURE_IMAGES = [
  Culture1Image,
  Culture2Image,
  Culture3Image,
  Culture4Image,
] as const;

const CULTURE_IMAGE_MOBILE = [
  Culture1ImageSmall,
  Culture2ImageSmall,
  Culture3ImageSmall,
  Culture4ImageSmall,
] as const;

const Page = () => {
  return (
    <section className="flex flex-col gap-64 tablet:gap-80 desktop:gap-120">
      {/* 상단 이미지 */}
      <section className="relative overflow-hidden">
        <figure className="relative h-[380px] w-full">
          <Image
            src={TopImage}
            alt="상단 이미지"
            fill
            className="object-cover"
          />
        </figure>
        <h1 className="absolute bottom-180 left-1/2 -translate-x-1/2 text-center text-[34px] font-600 leading-[140%] text-basic-white">
          팀 문화
        </h1>
      </section>

      {/* 팀문화 소개 */}
      <section className="container-padding flex flex-col justify-between gap-16 tablet:flex-row tablet:gap-24 ">
        <h2 className="break-keep text-24 font-600 leading-[160%] tablet:min-w-[375px] desktop:min-w-[385px]">
          팬들의 설렘을 위해, 가장 치열하게 움직이는 동료들
        </h2>
        <p className="break-keep text-20 font-500 leading-[140%] text-basic-grey-700">
          핸디버스는 셔틀을 필요로 하는 개개인의 목소리에서 시작되었습니다.
          &quot;팬덤이 좋아할 것인가?&quot;를 가장 먼저 고민하며 팬들이 원하는
          미래를 함께 만들어갑니다.
        </p>
      </section>

      {/* 팀문화 이미지 */}
      <section className="container-padding">
        <div className="hidden gap-24 tablet:grid tablet:grid-cols-1 desktop:grid-cols-2">
          {CULTURE_IMAGES.map((image, index) => (
            <figure key={index} className="relative aspect-[588/296] w-full">
              <Image
                src={image}
                alt={`팀문화 이미지 ${index + 1}`}
                fill
                className="rounded-16 object-cover"
              />
            </figure>
          ))}
        </div>
        <div className="flex flex-col gap-24 tablet:hidden">
          {CULTURE_IMAGE_MOBILE.map((image, index) => (
            <figure key={index} className="relative aspect-[343/370] w-full">
              <Image
                src={image}
                alt={`팀문화 이미지 ${index + 1}`}
                fill
                className="rounded-16 object-cover"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* 회사 복지 소개 */}
      <section className="container-padding mb-64 grid grid-cols-1 gap-16 tablet:mb-80 desktop:mb-120 desktop:grid-cols-2 desktop:gap-24">
        <section className="flex flex-col items-start gap-16 tablet:items-center desktop:items-start">
          <h2 className="break-keep text-24 font-600 leading-[140%]">
            일과 삶의 균형, 핸디버스가 보장합니다
          </h2>
          <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
            불필요한 고민 없이 업무에만 집중할 수 있도록, 팀원의 삶의 질을
            높이는 방식을 고민합니다. 핸디버스에서는 열정과 시간을 가장 가치있게
            사용할 수 있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-16">
          {/* 개인의 행복 🩵 */}
          <div className="flex flex-col justify-between gap-8 rounded-16 bg-basic-grey-50 px-32 py-24 tablet:h-[126px] tablet:flex-row tablet:items-center">
            <h3 className="text-20 font-700 leading-[160%]">개인의 행복 🩵</h3>
            <p className="text-start text-16 font-400 leading-[140%] tablet:text-end">
              덕업일치 지원(제휴사 공연 티켓)
              <br />
              문화활동 전용 셔틀 지원
              <br />
              연간 종합 건강 검진 지원
            </p>
          </div>

          {/* 자유로운 환경 🍀 */}
          <div className="flex flex-col justify-between gap-8 rounded-16 bg-basic-grey-50 px-32 py-24 tablet:h-[126px] tablet:flex-row tablet:items-center">
            <h3 className="text-20 font-700 leading-[160%]">
              자유로운 환경 🍀
            </h3>
            <p className="text-start text-16 font-400 leading-[140%] tablet:text-end">
              유연근무제 (오전 8-10시 자율 출근) <br />
              승인 없는 연차 <br />
              조건 없는 컨디션데이 (연 4회)
            </p>
          </div>

          {/* 성장과 몰입 💪 */}
          <div className="flex flex-col justify-between gap-8 rounded-16 bg-basic-grey-50 px-32 py-24 tablet:h-[126px] tablet:flex-row tablet:items-center">
            <h3 className="text-20 font-700 leading-[160%]">성장과 몰입 💪</h3>
            <p className="text-start text-16 font-400 leading-[140%] tablet:text-end">
              업무를 위한 도서.교육비 지원 <br />
              업무 생산성을 위한 툴 지원
            </p>
          </div>
        </section>
      </section>

      <Footer />
    </section>
  );
};

export default Page;
