import getSections from '@/app/actions/getSections';
import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';
import MyLink from '../ui/MyLink';

const SideNavbar = async () => {
  const sections = await getSections();

  const NavHeading = ({ children }: { children: ReactNode }) => {
    return <p className='text-zinc-400'>{children}</p>;
  };

  const InnerGroup = ({ children }: { children: ReactNode }) => {
    return <div className='mx-4'>{children}</div>;
  };

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

  interface NavLinkProps {
    href: string;
    children: React.ReactNode;
  }

  const NavLink = ({ href, children }: NavLinkProps) => (
    <MyLink className='inline-block w-full py-2 pl-4 pr-8' type='nav' href={href}>
      {children}
    </MyLink>
  );

  return (
    <div className='w-44 mr-4'>
      <div className='fixed w-44 top-40 pl-4'>
        <NavHeading>Settings</NavHeading>
        <LinkGroup>
          <NavLink href={'/admin/general'}>General</NavLink>
        </LinkGroup>
        <NavHeading>Sections</NavHeading>
        <LinkGroup>
          {sections.map((section) => (
            <NavLink key={section.id} href={`/admin/section/${section.unique_name}`}>
              {section.title}
            </NavLink>
          ))}
        </LinkGroup>
      </div>
    </div>
  );
};

export default SideNavbar;
