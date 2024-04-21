import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { revalidatePath } from 'next/cache';

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

    // Find required order value
    const allImages = await prisma.heroImages.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    const numImages = allImages.length;
    const lastImageOrderNum = numImages === 0 ? 0 : allImages[numImages - 1].order;

    // Add hero image
    const image = await prisma.heroImages.create({
      data: { imageUrl, altText, order: lastImageOrderNum + 1 },
    });

    revalidatePath('/');

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
