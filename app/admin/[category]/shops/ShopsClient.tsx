'use client';

import HeaderBar from '@/app/components/admin/HeaderBar';
import Heading from '@/app/components/Typography/Heading';
import MyLink from '@/app/components/admin/ui/MyLink';
import React from 'react';
import ShopTable, { Shop } from '@/app/components/admin/Shops/ShopTable';

interface ShopClientProps {
  shops: Shop[];
}

const ShopClient = ({ shops }: ShopClientProps) => {
  return (
    <>
      <HeaderBar>
        <Heading title='Artists' />
        <MyLink
          className='mb-2 bg-blue-500'
          href='/admin/collections/shops/new'
          type='button-regular'>
          Add Shop
        </MyLink>
      </HeaderBar>
      <ShopTable shops={shops} />
    </>
  );
};

export default ShopClient;
