import React, { useEffect } from 'react';
import Image from 'next/image';
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
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.classList.add('overflow-hidden');

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <>
      <div className='fixed inset-0 bg-black opacity-50 z-30' onClick={closeMenu}></div>
      <div className='fixed inset-y-0 right-0 w-4/5 md:w-1/3 bg-white z-40 shadow-lg flex flex-col justify-start p-4'>
        <div className='flex justify-start mb-8'>
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
        </div>
        <nav>
          <ul className='space-y-4'>
            {navLinks.map((link) => (
              <li key={link.title}>
                <MyLink href={link.href} onClick={closeMenu}>
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
