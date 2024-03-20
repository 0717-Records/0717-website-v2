import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HamburgerCross } from './HamburgerButtons';
import useLockBodyScroll from '@/app/hooks/useLockBodyScroll';
import MyLink from '../admin/ui/MyLink';

export interface NavLink {
  href: string;
  title: string;
}

interface HamburgerMenuContentProps {
  navLinks: NavLink[];
  logoSrc: string;
  closeMenu: () => void;
}

const HamburgerMenuContent: React.FC<HamburgerMenuContentProps> = ({
  navLinks,
  logoSrc,
  closeMenu,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const setIsBodyScrollLocked = useLockBodyScroll();

  useEffect(() => {
    setIsShowing(true);
    setIsMounted(true);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    setIsBodyScrollLocked(true);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isMounted && !isShowing) setTimeout(closeMenu, 300);
  }, [isShowing]);

  const onClose = () => {
    setIsShowing(false);
    setIsBodyScrollLocked(false);
  };

  return (
    <>
      {isShowing && (
        <div
          className={`fixed inset-0 z-30 bg-black bg-opacity-30 backdrop-blur-sm`}
          onClick={onClose}></div>
      )}
      <div
        className={`flex fixed inset-y-0 right-0 w-4/5 md:w-1/4 bg-white z-40 shadow-lg flex-col justify-start p-4 transition-transform duration-300 ${
          isShowing ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className='flex justify-between mb-8'>
          <div className='w-full max-w-48 relative'>
            <Image
              src={logoSrc}
              alt='Company logo'
              layout='responsive'
              width={388}
              height={125}
              objectFit='contain'
              priority
            />
          </div>
          <button
            aria-label='Open menu'
            onClick={onClose}
            className='flex justify-center items-center focus:outline-none w-16 h-16 rounded-full hover:bg-primary_yellow transition'>
            <HamburgerCross />
          </button>
        </div>
        <nav>
          <ul className='flex flex-col gap-4'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <MyLink
                  type='nav'
                  className={`flex items-center p-4 text-2xl text-black rounded-md font-bold w-full h-10 transition duration-200 ease-in-out hover:bg-primary_yellow`}
                  href={link.href}>
                  {link.title}
                </MyLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenuContent;
