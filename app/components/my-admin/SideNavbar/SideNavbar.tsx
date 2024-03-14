import getSections from '@/app/actions/getSections';
import React from 'react';
import { ReactNode } from 'react';
import LinkGroup from './LinkGroup';
import NavLink from './NavLink';
import toSentenceCase from '@/app/libs/toSentenceCase';

const SideNavbar = async () => {
  const category_sections = await getSections();

  const NavHeading = ({ children }: { children: ReactNode }) => {
    return <p className='text-zinc-400'>{children}</p>;
  };

  return (
    <nav
      className={`left-24 w-48 fixed z-10 inset-0 top-20 right-auto pb-10 overflow-y-auto pt-14`}>
      {category_sections.map((category) => {
        if (!category.sections.length) return null;
        return (
          <div key={category.id}>
            <NavHeading>{toSentenceCase(category.name)}</NavHeading>
            <LinkGroup>
              {category.sections.map((section) => (
                <NavLink key={section.id} href={`/admin/${category.name}/${section.unique_name}`}>
                  {section.title}
                </NavLink>
              ))}
            </LinkGroup>
          </div>
        );
      })}
    </nav>
  );
};

export default SideNavbar;
