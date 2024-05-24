import React from 'react';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import { Shop } from '@/app/components/admin/Shops/ShopTable';
import getShops from '@/app/actions/getShops';
import ShopsClient from './ShopsClient';

const Shops = async () => {
  const shops: Shop[] = await getShops();

  return (
    <>
      <ScrollToTop />
      <ShopsClient shops={shops} />
    </>
  );
};

export default Shops;
