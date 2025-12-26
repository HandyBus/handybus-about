import LogoIcon from 'public/icons/logo.svg';
import TwitterXIcon from 'public/icons/twitter-x.svg';
import InstagramIcon from 'public/icons/instagram.svg';
import NaverBlogIcon from 'public/icons/naver-blog.svg';
import ArrowOutwardIcon from 'public/icons/arrow-outward.svg';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-8 px-16 py-[28px]">
      <div className="flex justify-between">
        <LogoIcon />
        <div className="flex gap-16">
          <a
            href="https://www.instagram.com/handy.bus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://x.com/Handy_Bus?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterXIcon />
          </a>
          <a
            href="https://blog.naver.com/handy_bus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NaverBlogIcon />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-8 text-12 font-600 text-basic-grey-600">
        <Link
          href="https://www.handybus.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          서비스 바로가기
          <ArrowOutwardIcon />
        </Link>
        <span className="font-400"> | </span>
        <Link
          href="https://www.handybus.co.kr/help/faq/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          개인정보처리방침
          <ArrowOutwardIcon />
        </Link>
      </div>
      <div className="text-12 font-400 leading-[1.6] text-basic-grey-400">
        상호명: 핸디버스 | 대표자: 정지용 | 전화번호: 0507-1372-6141 | 이메일:
        handybus@handybus.co.kr | 사업자등록번호: 522-59-00696 |
        통신판매업신고번호: 2024-서울강북-0849 | 주소: 서울특별시 성북구
        안암로145, 경영본관 219호
      </div>
    </footer>
  );
};

export default Footer;
