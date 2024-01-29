import MyLink from '../../ui/MyLink';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <MyLink className='inline-block w-full py-2 pl-4 pr-8' type='nav' href={href}>
    {children}
  </MyLink>
);

export default NavLink;
