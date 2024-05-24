import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

interface IParams {
  shopId: string;
}

export const PUT = async (request: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const { shopId } = params;

    const body = await request.json();
    const { name, url, description, display, imageSrc, order } = body;

    // Update shop
    await prisma.shop.update({
      where: {
        id: shopId,
      },
      data: { name, url, description, display, image: imageSrc, order },
    });

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to update shop right now! Please try again later.', {
      status: 400,
      statusText: 'PUT_SHOP_FAIL',
    });
  }
};

// export const DELETE = async (request: Request, { params }: { params: IParams }) => {
//   try {
//     const currentUser = await getCurrentUser();

//     if (!currentUser)
//       throw new NextResponse('Please log in first!', {
//         status: 400,
//         statusText: 'NO_CURRENT_USER',
//       });

//     const { artistId } = params;

//     // Delete artist
//     await prisma.artist.delete({
//       where: {
//         id: artistId,
//       },
//     });

//     return NextResponse.json({});
//   } catch (error: any) {
//     console.error(error);

//     if (error?.statusText) return error;

//     return new NextResponse('Unable to delete artist right now! Please try again later.', {
//       status: 400,
//       statusText: 'DELETE_ARTIST_FAIL',
//     });
//   }
// };
