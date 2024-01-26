import Link from 'next/link';
import React from 'react';
import { buttonStyles } from './Button';

interface MyLinkProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  onClick?: () => void;
  type?: 'regular' | 'nav' | 'button-regular' | 'button-outline';
}

const MyLink: React.FC<MyLinkProps> = ({ href, target, onClick, children, type = 'regular' }) => {
  let classes;
  if (type === 'regular') {
    classes = 'text-blue-500 hover:underline transition';
  }
  if (type === 'nav') {
    classes = 'hover:font-bold transition';
  }
  if (type === 'button-regular') {
    classes = buttonStyles();
  }
  if (type === 'button-outline') {
    classes = buttonStyles({ outline: true });
  }

  return (
    <Link target={target} href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
};

export default MyLink;
