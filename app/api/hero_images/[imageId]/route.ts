import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

interface IParams {
  imageId: string;
}

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
