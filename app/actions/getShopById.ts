import prisma from '@/app/libs/prisma';

const getShopById = async (shopId?: string) => {
  try {
    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    return shop ? shop : null;
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2023') return null;
    throw error;
  }
};

export default getShopById;
