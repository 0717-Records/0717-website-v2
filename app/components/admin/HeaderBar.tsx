import React, { ReactNode } from 'react';

const HeaderBar = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className='
      fixed 
      flex 
      justify-between 
      items-center 
      h-20 
      top-20 
      pt-4 
      w-full 
      pr-[22rem] 
      bg-neutral-50 
      z-10 
      border-b 
      border-gray-300'>
      {children}
    </div>
  );
};

export default HeaderBar;
