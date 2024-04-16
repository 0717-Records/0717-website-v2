'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HamburgerMenu from './HamburgerMenu';
import { HamburgerButton } from './HamburgerButtons';
import Link from 'next/link';

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
    <>
      <header className='fixed z-40 w-full top-0 left-0 px-2 sm:px-4 h-[4.5rem] sm:h-24 bg-white shadow-lg flex items-center justify-between'>
        <Link
          href='#'
          className='w-full max-w-32 sm:max-w-48 relative filter drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)] hover:scale-105 transition-all'>
          <Image
            src={logoSrc}
            alt='Company logo'
            layout='responsive'
            width={388}
            height={125}
            objectFit='contain'
            priority
          />
        </Link>

        <nav role='navigation' className='hidden lg:block'>
          <ul className='flex'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  type='nav'
                  className='flex justify-center items-center text-2xl text-black rounded-full font-bold w-36 h-10 transition duration-200 ease-in-out hover:bg-primary_yellow'
                  href={link.href}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='w-48 flex justify-end'>
          <button
            aria-label='Open menu'
            onClick={toggleMenu}
            className='flex justify-center items-center focus:outline-none w-14 h-14 sm:w-16 sm:h-16 rounded-full active:bg-primary_yellow sm:hover:bg-primary_yellow transition'>
            <HamburgerButton />
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
      <div className='h-[4.5rem] sm:h-24'></div>
    </>
  );
};

export default Header;
