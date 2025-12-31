'use client';

import LogoIcon from 'public/icons/logo-v3.svg';
import Link from 'next/link';
import ArrowOutwardIcon from 'public/icons/arrow-outward-black.svg';
import MenuIcon from 'public/icons/menu.svg';
import CloseIcon from 'public/icons/close.svg';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 드로워가 열렸을때 스크롤 잠금
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-56 w-full max-w-1280 items-center justify-between bg-basic-white pl-20 pr-8 tablet:px-40">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="hidden gap-16 whitespace-nowrap text-14 font-600 leading-[140%] tablet:flex">
          <Link href="/" className="px-12 py-[6px]">
            회사 소개
          </Link>
          <Link href="/culture" className="px-12 py-[6px]">
            팀 문화
          </Link>
          <Link href="/jobs" className="px-12 py-[6px]">
            채용 공고
          </Link>
          <Link
            href="https://handybus.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-12 py-[6px]"
          >
            블로그
            <ArrowOutwardIcon />
          </Link>
          <Link href="/contact" className="px-12 py-[6px]">
            협업 문의
          </Link>
        </div>
        <button
          className="transition-opacity duration-300 tablet:hidden"
          onClick={handleToggleMenu}
        >
          <MenuIcon />
        </button>
      </header>

      {/* 드로워 (모바일) */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 tablet:hidden ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-full bg-basic-white transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-60 w-full items-center justify-end bg-basic-white pr-8">
            <button
              onClick={handleCloseMenu}
              className="flex h-48 w-48 items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-col">
            <Link
              href="/"
              onClick={handleCloseMenu}
              className="flex h-48 items-center px-20 py-8 text-16 font-600 leading-[140%] text-basic-black"
            >
              회사 소개
            </Link>
            <Link
              href="/culture"
              onClick={handleCloseMenu}
              className="flex h-48 items-center px-20 py-8 text-16 font-600 leading-[140%] text-basic-black"
            >
              팀 문화
            </Link>
            <Link
              href="/jobs"
              onClick={handleCloseMenu}
              className="flex h-48 items-center px-20 py-8 text-16 font-600 leading-[140%] text-basic-black"
            >
              채용 공고
            </Link>
            <Link
              href="https://handybus.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCloseMenu}
              className="gap-2 flex h-48 items-center px-20 py-8 text-16 font-600 leading-[140%] text-basic-black"
            >
              블로그
              <ArrowOutwardIcon className="h-20 w-20" />
            </Link>
            <Link
              href="/contact"
              onClick={handleCloseMenu}
              className="flex h-48 items-center px-20 py-8 text-16 font-600 leading-[140%] text-basic-black"
            >
              협업 문의
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
