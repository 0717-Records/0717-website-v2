'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface LinkGroupProps {
  children: React.ReactNode;
}

const LinkGroup = ({ children }: LinkGroupProps) => {
  const pathname = usePathname();
  return (
    <ul className='mb-4'>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const props = child.props;
          const active = pathname === props.href;

          return (
            <li
              className={`
              my-1
            hover:bg-neutral-200 
              ${active ? 'bg-neutral-200' : ''} 
              rounded-sm 
            `}
              key={index}>
              {child}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default LinkGroup;
