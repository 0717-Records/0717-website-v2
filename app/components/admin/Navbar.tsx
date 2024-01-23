import React from 'react';
import Logout from './Logout';
import Image from 'next/image';

const Navbar = async () => {
  return (
    <nav className='p-4 flex justify-between items-center'>
      <Image src='/images/logo-small-black.webp' width='60' height='60' alt='Logo' />
      <Logout />
    </nav>
  );
};

export default Navbar;
