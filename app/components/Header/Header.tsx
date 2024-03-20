'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MyLink from '../admin/ui/MyLink';
import HamburgerMenu from './HamburgerMenu';
import { HamburgerButton, HamburgerCross } from './HamburgerButtons';

const navLinks = [
  { href: '#', title: 'Explore' },
  { href: '#', title: 'Connect' },
  { href: '#', title: 'Engage' },
  { href: '#', title: 'Shop' },
  { href: '#', title: 'Discover' },
];

const logoSrc = '/images/logo-text.png';

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <header className='fixed z-40 w-full top-0 left-0 p-4 bg-white shadow-md flex items-center justify-between'>
      <div className='flex justify-start w-1/3'>
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
      <nav className='flex justify-center w-1/3' role='navigation'>
        <ul className='flex space-x-4'>
          {navLinks.map((link) => (
            <li key={link.title}>
              <MyLink href={link.href}>{link.title}</MyLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex justify-end w-1/3'>
        <button
          aria-label={isHamburgerOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
          className='fixed z-50 top-4 right-4 focus:outline-none'>
          {isHamburgerOpen ? <HamburgerCross /> : <HamburgerButton />}
        </button>
        {isHamburgerOpen && (
          <HamburgerMenu
            navLinks={navLinks}
            logoSrc={logoSrc}
            closeMenu={() => setIsHamburgerOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
