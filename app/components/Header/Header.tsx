'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MyLink from '../admin/ui/MyLink';
import HamburgerMenu from './HamburgerMenu';
import { HamburgerButton } from './HamburgerButtons';
import HamburgerMenuContent from './HamburgerMenuContent';

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
      <header className='fixed z-40 w-full top-0 left-0 p-4 bg-white shadow-md flex items-center justify-between'>
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
        <nav role='navigation' className='hidden lg:block'>
          <ul className='flex'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <MyLink
                  type='nav'
                  className='flex justify-center items-center text-2xl text-black rounded-full font-bold w-36 h-10 transition duration-200 ease-in-out hover:bg-primary_yellow'
                  href={link.href}>
                  {link.title}
                </MyLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className='w-48 flex justify-end'>
          <button
            aria-label='Open menu'
            onClick={toggleMenu}
            className='flex justify-center items-center focus:outline-none w-16 h-16 rounded-full hover:bg-primary_yellow transition'>
            <HamburgerButton />
          </button>
          {isHamburgerOpen && (
            <HamburgerMenuContent
              navLinks={navLinks}
              logoSrc={logoSrc}
              closeMenu={() => setIsHamburgerOpen(false)}
            />
            // <HamburgerMenu
            //   navLinks={navLinks}
            //   logoSrc={logoSrc}
            //   closeMenu={() => setIsHamburgerOpen(false)}
            // />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
