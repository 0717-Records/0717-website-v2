import prisma from '@/app/libs/prisma';
import { Shop } from '../components/admin/Shops/ShopTable';

const getShops = async () => {
  try {
    const shops: Shop[] = await prisma.shop.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return shops;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getShops;
