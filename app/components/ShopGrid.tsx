'use client';

import React from 'react';
import Image from 'next/image';
import { Shop } from './admin/Shops/ShopTable';
import Link from 'next/link';

interface ShopGridProps {
  shops: Shop[];
}

const ShopGrid = ({ shops }: ShopGridProps) => {
  return (
    <div className='flex gap-9 md:gap-12 max-w-screen-md justify-center flex-wrap px-4'>
      {shops.map((shop) => (
        <Link
          key={shop.id}
          href={shop.url}
          target='_blank'
          className='flex flex-col justify-start items-center cursor-pointer sm:w-[35vw] sm:max-w-[10rem] sm:flex-grow sm:mx-2 group max-w-32'>
          <div className='w-32 h-32 overflow-hidden rounded-lg mb-4 relative transition-all duration-200 ease-in-out sm:w-40 sm:h-40 group-hover:scale-[1.02]'>
            <Image
              fill
              src={shop.image || '/images/shop-img-placeholder.png'}
              alt={shop.name}
              sizes='(min-width: 1024px) 30vw, (min-width: 640px) 35vw, 50vw'
              className='object-cover'
            />
          </div>
          <h3 className='text-xl group-hover:font-semibold'>{shop.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ShopGrid;
