import Link from 'next/link';
import React from 'react';
import { buttonStyles } from './Button';

interface MyLinkProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'regular' | 'nav' | 'button-regular' | 'button-outline';
  className?: string;
}

const MyLink: React.FC<MyLinkProps> = ({
  href,
  target,
  onClick,
  children,
  type = 'regular',
  className: propClasses,
}) => {
  let typeClasses;
  if (type === 'regular') {
    typeClasses = 'text-blue-500 hover:underline transition';
  }
  if (type === 'nav') {
    typeClasses = 'hover:font-bold transition';
  }
  if (type === 'button-regular') {
    typeClasses = buttonStyles();
  }
  if (type === 'button-outline') {
    typeClasses = buttonStyles({ outline: true });
  }

  return (
    <Link target={target} href={href} className={`${propClasses} ${typeClasses}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export default MyLink;
