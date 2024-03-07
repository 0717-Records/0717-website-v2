'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import MyLink from './ui/MyLink';
import { Signika } from 'next/font/google';
import Paragraph from './typography/Paragraph';
import { FaExternalLinkAlt } from 'react-icons/fa';

const inter = Signika({ subsets: ['latin'] });

const NavItem = ({ children }: { children: ReactNode }) => <li className='ml-6'>{children}</li>;

const Navbar = () => {
  return (
    <nav className='px-4 flex justify-between items-center w-full fixed top-0 h-20 bg-white z-20 shadow-sm'>
      <div className='flex items-center'>
        <Image src='/images/logo-small-black.webp' width='60' height='60' alt='Logo' />
        <p className={`${inter.className} text-4xl font-extrabold mx-5`}>07:17 Records</p>
        <Paragraph size='large'>Content Management System</Paragraph>
      </div>

      <ul className='flex items-center'>
        <NavItem>
          <MyLink className='flex items-center' type='button-outline' target='_blank' href='/'>
            Main Site <FaExternalLinkAlt className='ml-2' />
          </MyLink>
        </NavItem>
        <NavItem>
          <MyLink type='nav' onClick={() => signOut({ callbackUrl: '/' })} href=''>
            Logout
          </MyLink>
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
