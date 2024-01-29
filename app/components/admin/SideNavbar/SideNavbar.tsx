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
    <nav
      className={`left-24 w-48 fixed z-10 inset-0 top-20 right-auto pb-10 overflow-y-auto pt-14`}>
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
    </nav>
  );
};

export default SideNavbar;
