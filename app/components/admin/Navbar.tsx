import React from 'react';
import Logout from '../Logout';

const Navbar = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <nav className='flex justify-between'>
      <div>LOGO HERE</div>
      {isLoggedIn && <Logout />}
    </nav>
  );
};

export default Navbar;
