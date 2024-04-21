import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

interface IParams {
  imageId: string;
}

interface PutDataTypes {
  direction: 'up' | 'down';
}

export const PUT = async (request: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const { imageId } = params;
    const { direction }: PutDataTypes = await request.json();

    // Check supplied diretion is valid
    if (direction !== 'up' && direction !== 'down')
      throw new NextResponse('Invalid direction!', {
        status: 400,
        statusText: 'INVALID_DIRECTION',
      });

    // Get all images in list
    const allImages = await prisma.heroImages.findMany({});

    // Find target image to update
    const targetIndex = allImages.findIndex((image) => image.id === imageId);
    if (targetIndex === -1) throw new Error('Image not found in the list!');

    // Check we can move in that direction
    const swapIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1;
    if (swapIndex < 0 || swapIndex >= allImages.length)
      throw new Error('Cannot move in the specified direction');

    // Update orders
    await prisma.$transaction([
      prisma.eventListEvent.update({
        where: { id: allImages[targetIndex].id },
        data: { order: allImages[swapIndex].order },
      }),
      prisma.eventListEvent.update({
        where: { id: allImages[swapIndex].id },
        data: { order: allImages[targetIndex].order },
      }),
    ]);
    revalidatePath('/');

    return NextResponse.json({});
  } catch (error: any) {
    throw new Error(`Failed to update image order. Error: ${error.message}`);
  }
};

export const DELETE = async (request: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const { imageId } = params;

    // Delete hero image
    await prisma.heroImages.delete({
      where: {
        id: imageId,
      },
    });

    revalidatePath('/');

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to delete hero image right now! Please try again later.', {
      status: 400,
      statusText: 'DELETE_HERO_IMAGE_FAIL',
    });
  }
};
