import Link from 'next/link';
import React from 'react';

interface MyLinkProps {
  navLink?: boolean;
  href: string;
  children: React.ReactNode;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyLink: React.FC<MyLinkProps> = ({ navLink = false, href, target, onClick, children }) => {
  const regLink = !navLink;

  return (
    <Link
      target={target}
      href={href}
      className={`${regLink ? 'text-blue-500 hover:underline' : ''} 
        ${navLink ? 'hover:font-bold' : ''} 
        transition
      `}>
      {children}
    </Link>
  );
};

export default MyLink;
