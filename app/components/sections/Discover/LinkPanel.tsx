'use client';

import React from 'react';
import { Link as LinkType } from '@/app/types';
import Link from 'next/link';
import { getIconByName } from '../../admin/LinkTable/IconDropDown';

const LinkPanel = ({ links }: { links: LinkType[] }) => {
  return (
    <div className='flex flex-wrap justify-center gap-6 mb-14'>
      {links.map((link: LinkType, index: number) => (
        <Link key={index} className='w-16 h-16 drop-shadow-md' target='_blank' href={link.url}>
          {getIconByName(link.iconType || '')}
        </Link>
      ))}
    </div>
  );
};

export default LinkPanel;
