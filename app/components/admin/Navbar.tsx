'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import MyLink from '../ui/MyLink';
import { Signika } from 'next/font/google';
import Paragraph from '../typography/Paragraph';

const inter = Signika({ subsets: ['latin'] });

const NavItem = ({ children }: { children: ReactNode }) => <li className='ml-4'>{children}</li>;

const Navbar = () => {
  return (
    <nav className='p-3 flex justify-between items-center'>
      <div className='flex items-center'>
        <Image src='/images/logo-small-black.webp' width='60' height='60' alt='Logo' />
        <p className={`${inter.className} text-4xl font-extrabold mx-5`}>07:17 Records</p>
        <Paragraph size='large'>Content Management System</Paragraph>
      </div>

      <ul className='flex p-4'>
        <NavItem>
          <MyLink type='button-outline' target='_blank' href='/'>
            Main Site
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
