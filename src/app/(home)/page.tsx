import Image, { StaticImageData } from 'next/image';
import TopImage from './images/top-image.png';
import AudienceImage from './images/audience-image.png';
import Card1Image from './images/card1.png';
import Card2Image from './images/card2.png';
import Card3Image from './images/card3.png';
import Card4Image from './images/card4.png';
import Metric1Image from './images/metric1.png';
import Metric2Image from './images/metric2.png';
import Metric3Image from './images/metric3.png';
import Metric4Image from './images/metric4.png';
import Service1Image from './images/service1.png';
import Service2Image from './images/service2.png';
import Service3Image from './images/service3.png';
import PartnerTadaImage from './images/brand-tada.png';
import PartnerKlookImage from './images/brand-klook.png';
import PartnerKoreaUnivImage from './images/brand-korea-univ.png';
import PartnerDaquImage from './images/brand-daqu-village.png';
import PartnerFstvlLifeImage from './images/brand-fstvl-life.png';
import PartnerGoldLimusineImage from './images/brand-gold-limusine.png';
import PartnerTheBusImage from './images/brand-the-bus.png';
import PartnerSnapshootImage from './images/brand-snapshoot.png';
import BottomImage from './images/bottom-image.png';
import DownloadIcon from 'public/icons/download.svg';
import { CSSProperties } from 'react';
import './page.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사 소개',
  description: '팬덤 문화의 새로운 경험을 설계합니다.',
};

const CARD_IMAGES: StaticImageData[] = [
  Card1Image,
  Card2Image,
  Card3Image,
  Card4Image,
];

const METRICS_IMAGES: StaticImageData[] = [
  Metric1Image,
  Metric2Image,
  Metric3Image,
  Metric4Image,
];

const SERVICE_ITEM = [
  {
    order: 1,
    title: '셔틀버스 운영 대행',
    description1: '맞춤 셔틀 노선 설계',
    description2: '데이터 기반 수요 예측 및 노선 최적화',
    description3: '기사·차량·운영 스태프 통합 관리',
    description4: '현장 대응 및 돌발 상황 핸들링',
    image: Service1Image,
  },
  {
    order: 2,
    title: '관객 경험 기획',
    description1: '팬덤 맞춤형 차내 엔터테인먼트',
    description2: '온·오프라인 관람객 경험 기획',
    description3: '셔틀 연계 행사 마케팅 기획',
    description4: '타사 팬덤 서비스 연계',
    image: Service2Image,
  },
  {
    order: 3,
    title: '브랜드 광고',
    description1: '차량 외부·내부 브랜딩',
    description2: '행사·팬덤 맞춤형 제품/브랜드 광고',
    description3: '탑승객 대상 온·오프라인 브랜드 노출',
    description4: '브랜드 상호 연계 프로모션',
    image: Service3Image,
  },
];

type PartnerSize = {
  width: number;
  height: number;
};

type PartnerItem = {
  image: StaticImageData;
  sizes: {
    mobile: PartnerSize;
    tablet: PartnerSize;
    desktop: PartnerSize;
  };
};

const PARTNER_ITEM: PartnerItem[] = [
  {
    image: PartnerTadaImage,
    sizes: {
      mobile: { width: 96, height: 23 },
      tablet: { width: 127, height: 31 },
      desktop: { width: 159, height: 39 },
    },
  },
  {
    image: PartnerFstvlLifeImage,
    sizes: {
      mobile: { width: 120, height: 75 },
      tablet: { width: 124, height: 84 },
      desktop: { width: 218, height: 105 },
    },
  },
  {
    image: PartnerKlookImage,
    sizes: {
      mobile: { width: 121, height: 67 },
      tablet: { width: 160, height: 88 },
      desktop: { width: 200, height: 111 },
    },
  },
  {
    image: PartnerGoldLimusineImage,
    sizes: {
      mobile: { width: 106, height: 106 },
      tablet: { width: 140, height: 140 },
      desktop: { width: 175, height: 175 },
    },
  },
  {
    image: PartnerDaquImage,
    sizes: {
      mobile: { width: 96, height: 32 },
      tablet: { width: 127, height: 42 },
      desktop: { width: 159, height: 53 },
    },
  },
  {
    image: PartnerTheBusImage,
    sizes: {
      mobile: { width: 128, height: 26 },
      tablet: { width: 156, height: 35 },
      desktop: { width: 196, height: 44 },
    },
  },
  {
    image: PartnerKoreaUnivImage,
    sizes: {
      mobile: { width: 69, height: 51 },
      tablet: { width: 91, height: 68 },
      desktop: { width: 114, height: 85 },
    },
  },
  {
    image: PartnerSnapshootImage,
    sizes: {
      mobile: { width: 63, height: 63 },
      tablet: { width: 78, height: 78 },
      desktop: { width: 102, height: 102 },
    },
  },
];

const Page = () => {
  return (
    <section className="flex flex-col gap-64 tablet:gap-80 desktop:gap-120">
      {/* 상단 이미지 */}
      <section className="relative overflow-hidden">
        <figure className="relative h-[480px] w-full">
          <Image
            src={TopImage}
            alt="상단 이미지"
            fill
            className="object-cover"
          />
        </figure>
        <div className="absolute bottom-[151px] left-40 flex flex-col gap-16 text-basic-white tablet:bottom-[137px]">
          <h1 className="text-[34px] font-600 leading-[140%] tablet:text-[38px]">
            팬들이 원하는 순간,
            <br />
            어디서든 함께할 수 있도록
          </h1>
          <p className="text-18 font-500 leading-[140%] tablet:text-20">
            함께 만드는 팬덤의 여정, 핸디버스가 동행합니다.
          </p>
        </div>
      </section>

      {/* 소개 */}
      <section className="container-padding flex flex-col gap-16 tablet:flex-row tablet:gap-24">
        <section className="flex flex-col gap-16">
          <h2 className="text-24 font-600 leading-[140%]">
            팬덤 문화의 새로운 경험을 설계합니다.
          </h2>
          <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
            핸디버스는 단순한 &apos;이동 수단&apos;을 넘어, 팬덤 문화 전반을 아우르는
            &apos;경험 플랫폼&apos;으로 진화하고 있습니다.
          </p>
          <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
            콘서트 전문 셔틀 서비스로 시작하여, 팬들이 행사 장소로 이동하며
            느끼는 비일상적인 설렘과 이동의 편리함을 연결하는 데 집중해
            왔습니다. 핸디버스는 팬덤 데이터 분석을 통해 가장 안전하고 효율적인
            경로를 설계하며, 팬들이 소중한 시간을 낭비하지 않고 이벤트에 온전히
            몰입할 수 있도록 지원합니다.
          </p>
        </section>
        <figure className="relative aspect-[558/441] w-full">
          <Image
            src={AudienceImage}
            alt="관객 이미지"
            fill
            className="rounded-16 object-cover"
          />
        </figure>
      </section>

      {/* 그림 */}
      <section className="container-padding flex flex-col gap-24 tablet:grid tablet:grid-cols-2 desktop:flex desktop:flex-row">
        {CARD_IMAGES.map((card, index) => (
          <figure key={index} className="relative aspect-[282/376] w-full">
            <Image
              src={card}
              alt={`그림 ${index + 1}`}
              fill
              className="rounded-16 object-cover"
            />
          </figure>
        ))}
      </section>

      {/* 비전 */}
      <section className="container-padding flex flex-col gap-16 tablet:flex tablet:flex-row">
        <h2 className="whitespace-nowrap text-24 font-600 leading-[140%] tablet:min-w-[385px] tablet:leading-[160%]">
          Connecting Passion,
          <br />
          Expanding Experience
        </h2>
        <p className="text-16 font-500 leading-[140%] text-basic-grey-700 tablet:text-20 tablet:leading-[160%]">
          팬의 열정이 닿는 곳 어디든, 이동의 장벽을 허물고 연결의 경험을
          만들어가고 있습니다. 핸디버스는 단순한 이동수단이 아닌, 팬덤의 여정을
          함께하는 동행자가 되고자 합니다.
        </p>
      </section>

      {/* 성과 */}
      <section className="container-padding flex flex-col gap-24 tablet:flex-col desktop:flex-row desktop:gap-24">
        <section className="order-2 flex flex-col gap-24 tablet:order-1 tablet:grid tablet:grid-cols-2 desktop:order-1 desktop:min-w-[690px]">
          {METRICS_IMAGES.map((metric, index) => (
            <figure key={index} className="relative aspect-[333/203] w-full">
              <Image
                src={metric}
                alt={`성과 이미지 ${index + 1}`}
                fill
                className="rounded-16 object-cover"
              />
            </figure>
          ))}
        </section>
        <section className="order-1 flex flex-col gap-16 tablet:order-2 desktop:order-2">
          <h2 className="text-24 font-600 leading-[160%] tablet:leading-[140%]">
            팬덤 이동 시장에서 빠르게 성장하고 있습니다
          </h2>
          <p className="text-20 font-500 leading-[140%] text-basic-grey-700 tablet:text-16">
            핸디버스는 지난 기간동안 축적된 수만 건의 팬덤 이동 데이터를
            기반으로 국내 팬덤 셔틀 시장을 선도하고 있습니다. 저희는 단순 예약
            및 운행을 넘어, 팬들의 거주지 분포, 행사 성격 등을 다각도로 분석하여
            최적의 셔틀 경로와 시간표를 설계합니다.
          </p>
        </section>
      </section>

      {/* 우리가 하는 일 */}
      <section className="container-padding flex flex-col gap-40">
        <h2 className="text-center text-24 font-600 leading-[140%]">
          핸디버스는 다양한 방면으로 경험을 확장해 나가고 있습니다
        </h2>
        <section className="flex flex-col gap-24 desktop:flex-row">
          {SERVICE_ITEM.map((item, index) => (
            <section key={index} className="desktop:w-full">
              <figure className="relative aspect-[333/203] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-t-16 object-cover"
                />
              </figure>
              <div className="flex flex-col gap-[11px] rounded-b-16 bg-basic-grey-50 px-24 pb-24 pt-20">
                <div className="flex items-center gap-8">
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-4 bg-basic-grey-200">
                    {item.order}
                  </div>
                  <h3 className="text-20 font-600 leading-[140%] tablet:text-[23px] desktop:text-20">
                    {item.title}
                  </h3>
                </div>
                <ul className="flex list-disc flex-col pl-16 text-16 font-500 leading-[160%] text-basic-grey-700 tablet:text-20 desktop:text-16">
                  <li>{item.description1}</li>
                  <li>{item.description2}</li>
                  <li>{item.description3}</li>
                  <li>{item.description4}</li>
                </ul>
              </div>
            </section>
          ))}
        </section>
      </section>

      {/* 협력기업 */}
      <section className="container-padding flex flex-col gap-24 tablet:gap-40">
        <section className="flex flex-col gap-16 text-center">
          <h2 className="text-24 font-600 leading-[140%]">
            다채로운 팬덤 여정을 함께 만들어갑니다
          </h2>
          <p className="text-16 font-500 leading-[140%] text-basic-grey-700">
            K-POP을 비롯한 다양한 팬덤 문화의 성장을 위해, 핸디버스는 업계
            최고의 파트너들과 긴밀하게 협력하고 있습니다.
          </p>
        </section>
        <section className="grid grid-cols-4 rounded-16 bg-basic-grey-50 p-24">
          {PARTNER_ITEM.map((item, index) => {
            const { mobile, tablet, desktop } = item.sizes;

            return (
              <figure
                key={index}
                className="relative flex items-center justify-center"
                style={
                  {
                    '--partner-width-mobile': `${mobile.width}px`,
                    '--partner-height-mobile': `${mobile.height}px`,
                    '--partner-width-tablet': `${tablet.width}px`,
                    '--partner-height-tablet': `${tablet.height}px`,
                    '--partner-width-desktop': `${desktop.width}px`,
                    '--partner-height-desktop': `${desktop.height}px`,
                  } as CSSProperties
                }
              >
                <div className="partner-logo-container relative">
                  <Image
                    src={item.image}
                    alt={`파트너 이미지 ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </figure>
            );
          })}
        </section>
      </section>

      {/* 마무리 이미지 */}
      <section className="relative mb-64 overflow-hidden tablet:mb-80 desktop:mb-120 desktop:h-[300px] ">
        <figure className="relative h-[300px] w-full">
          <Image
            src={BottomImage}
            alt="하단 이미지"
            fill
            className="object-cover"
          />
        </figure>
        <section className="absolute inset-0 flex flex-col items-center justify-center gap-16 pb-[66.5px] pt-[67.5px] tablet:pb-[90px] tablet:pt-[91px] desktop:gap-24 desktop:bg-transparent desktop:py-0">
          <h2 className="text-[36px] font-600 leading-[140%] text-basic-white tablet:text-[38px]">
            팬덤 이동의 시작과 끝, 핸디버스
          </h2>
          <div className="flex gap-16">
            <button className="flex items-center justify-center gap-[2px] rounded-8 bg-brand-primary-400 px-16 py-12 text-basic-white">
              회사소개서
              <DownloadIcon />
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Page;
