import getSections from '@/app/actions/getSections';
import React from 'react';
import { ReactNode } from 'react';
import LinkGroup from './LinkGroup';
import NavLink from './NavLink';

const SideNavbar = async () => {
  const sections = await getSections();

  const NavHeading = ({ children }: { children: ReactNode }) => {
    return <p className='text-zinc-400'>{children}</p>;
  };

  return (
    <div className='w-40 md:w-60 mr-4 border border-blue-500'>
      <div className='fixed w-40 md:w-60 top-48 pl-4 border border-red-500'>
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
