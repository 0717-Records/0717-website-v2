import React from 'react';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import EmptyState from '@/app/components/admin/EmptyState';
import EditShopClient from './EditShopClient';
import getShopById from '@/app/actions/getShopById';

interface IParams {
  shopId?: string;
}

const EditShop = async ({ params }: { params: IParams }) => {
  const { shopId } = params;
  if (!shopId) return <EmptyState />;
  const shop = await getShopById(shopId);

  if (!shop)
    return (
      <EmptyState title='Unknown Shop!' subtitle={`Unable to find shop with ID: "${shopId}"`} />
    );
  return (
    <>
      <ScrollToTop />
      <EditShopClient shop={shop} />
    </>
  );
};

export default EditShop;
