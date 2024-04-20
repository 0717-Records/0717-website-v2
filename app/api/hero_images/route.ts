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

    const data = await request.json();
    const { imageUrl, altText } = data;

    // @TODO - derive order
    const order = 99;

    // Add hero image
    const image = await prisma.heroImages.create({
      data: { imageUrl, altText, order },
    });

    return NextResponse.json(image);
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to add image right now! Please try again later.', {
      status: 400,
      statusText: 'POST_HERO_IMAGE_FAIL',
    });
  }
};
