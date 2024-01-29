import React from 'react';

interface LinkGroupProps {
  children: React.ReactNode;
}

const LinkGroup = ({ children }: LinkGroupProps) => (
  <ul className='mb-4'>
    {React.Children.map(children, (child, index) => (
      <li
        className={`
          my-1
          hover:bg-neutral-200 
          rounded-sm 
        `}
        key={index}>
        {child}
      </li>
    ))}
  </ul>
);

export default LinkGroup;
