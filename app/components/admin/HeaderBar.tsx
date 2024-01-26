import React, { ReactNode } from 'react';

const HeaderBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className='fixed h-16 top-20 pt-3 w-full bg-neutral-50 z-10 border-b border-gray-300'>
      {children}
    </div>
  );
};

export default HeaderBar;
