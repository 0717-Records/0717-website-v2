import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const body = await request.json();
    const { name, url, description, display, imageSrc } = body;

    // Derive order
    const lastShop = await prisma.shop.findFirst({
      orderBy: {
        order: 'desc',
      },
    });
    const order = lastShop ? lastShop.order + 1 : 1;

    // Create shop
    const shop = await prisma.shop.create({
      data: { name, url, description, display, image: imageSrc, order },
    });

    return NextResponse.json(shop);
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to create shop right now! Please try again later.', {
      status: 400,
      statusText: 'POST_SHOP_FAIL',
    });
  }
};
