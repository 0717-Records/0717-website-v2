import prisma from '@/app/libs/prisma';

const getShopCount = async () => {
  return 0;
  try {
    const count = await prisma.shop.count({
      where: {
        display: true,
      },
    });
    return count;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getShopCount;
