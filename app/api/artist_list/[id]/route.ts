import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  id: string;
}

export const PUT = async (request: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    throw new NextResponse('Please log in first!', {
      status: 400,
      statusText: 'NO_CURRENT_USER',
    });

  const { id } = params;
  const { artistIds } = await request.json();
  try {
    const updatedArtistList = await prisma.artistList.update({
      where: { id },
      data: {
        artistIds,
      },
    });

    return NextResponse.json(updatedArtistList);
  } catch (error: any) {
    throw new Error(`Failed to update artist list with ID ${id}. Error: ${error.message}`);
  }
};
