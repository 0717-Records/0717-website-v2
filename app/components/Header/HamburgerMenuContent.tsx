import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MyLink from '../admin/ui/MyLink';
import { HamburgerCross } from './HamburgerButtons';

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

  useEffect(() => {
    setIsShowing(true);
    setIsMounted(true);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.classList.add('overflow-hidden');

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (isMounted && !isShowing) setTimeout(closeMenu, 300);
  }, [isShowing]);

  const onClose = () => {
    setIsShowing(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-30 ${
          isShowing ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}></div>
      <div
        className={`flex fixed inset-y-0 right-0 w-4/5 md:w-1/3 bg-white z-40 shadow-lg flex-col justify-start p-4 transition-transform duration-300 ${
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
            className='flex justify-center items-center focus:outline-none w-16 h-16 rounded-full hover:bg-primary_yellow_light transition'>
            <HamburgerCross />
          </button>
        </div>
        <nav>
          <ul className='space-y-4'>
            {navLinks.map((link) => (
              <li key={link.title}>
                <MyLink href={link.href} onClick={onClose}>
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
