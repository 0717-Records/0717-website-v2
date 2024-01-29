'use client';

import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  type?: 'h1' | 'h2' | 'h3';
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ children, type = 'h1', subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      {type === 'h1' && <h1 className='text-3xl font-bold'>{children}</h1>}
      {type === 'h2' && <h2 className='text-2xl font-bold'>{children}</h2>}
      {type === 'h3' && <h3 className='text-xl font-bold'>{children}</h3>}

      <p className='font-light text-neutral-500 mt-2'>{subtitle}</p>
    </div>
  );
};

export default Heading;
