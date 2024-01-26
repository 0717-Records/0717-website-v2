'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import MyLink from '../ui/MyLink';
import Button from '../ui/Button';

const NavItem = ({ children }: { children: ReactNode }) => <li className='ml-4'>{children}</li>;

const Navbar = () => {
  return (
    <nav className='p-4 flex justify-between items-center'>
      <Image src='/images/logo-small-black.webp' width='60' height='60' alt='Logo' />
      <ul className='flex p-4'>
        <NavItem>
          <MyLink type='button-outline' target='_blank' href='/'>
            Main Site
          </MyLink>
        </NavItem>
        <NavItem>
          <MyLink type='nav' onClick={() => signOut({ callbackUrl: '/' })} href='/'>
            Logout
          </MyLink>
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
