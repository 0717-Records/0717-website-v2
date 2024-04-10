import React from 'react';
import dynamic from 'next/dynamic';
import { NavLink } from './HamburgerMenuContent';

export interface HamburgerMenuProps {
  navLinks: NavLink[];
  logoSrc: string;
  closeMenu: () => void;
}

const DynamicHamburgerMenu = dynamic(() => import('./HamburgerMenuContent'), {
  ssr: false,
});

const HamburgerMenu = ({ navLinks, logoSrc, closeMenu }: HamburgerMenuProps) => {
  return (
    <>
      <DynamicHamburgerMenu closeMenu={closeMenu} navLinks={navLinks} logoSrc={logoSrc} />
    </>
  );
};

export default HamburgerMenu;
