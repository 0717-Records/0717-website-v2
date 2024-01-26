import getSections from '@/app/actions/getSections';
import Link from 'next/link';
import { ReactNode } from 'react';

const SideNavbar = async () => {
  const sections = await getSections();

  const NavHeading = ({ children }: { children: ReactNode }) => {
    return <p className='text-lg text-zinc-400'>{children}</p>;
  };

  const InnerGroup = ({ children }: { children: ReactNode }) => {
    return <div className='mx-4'>{children}</div>;
  };

  return (
    <div className='w-40'>
      <div className='fixed top-40 pl-4'>
        <NavHeading>Settings</NavHeading>
        <InnerGroup>
          <Link href={'/admin/general'}>General</Link>
        </InnerGroup>
        <NavHeading>Sections</NavHeading>
        <InnerGroup>
          <ul>
            {sections.map((section) => (
              <li className='p-2' key={section.id}>
                <Link href={`/admin/section/${section.id}`}>{section.title}</Link>
              </li>
            ))}
          </ul>
        </InnerGroup>
      </div>
    </div>
  );
};

export default SideNavbar;
