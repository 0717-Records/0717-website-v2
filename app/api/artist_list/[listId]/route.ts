import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listId: string;
}

interface dataTypes {
  artistId: string;
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

    const { listId } = params;
    const { artistId, direction }: dataTypes = await request.json();

    const artistList_artist = await prisma.artistListArtist.findMany({
      where: { artistListId: listId },
      orderBy: { order: 'asc' },
    });

    const currentIndex = artistList_artist.findIndex((item) => item.artistId === artistId);
    if (currentIndex === -1) throw new Error('Artist not found in list!');

    let adjArtist;
    if (direction === 'up') {
      if (currentIndex === 0) throw new Error('Artist is already at the top of the list');
      adjArtist = artistList_artist[currentIndex - 1];
    }
    if (direction === 'down') {
      if (currentIndex === artistList_artist.length - 1)
        throw new Error('Artist is already at the bottom of the list');
      adjArtist = artistList_artist[currentIndex + 1];
    }

    const currentArtist = artistList_artist[currentIndex];
    const currArtistOrder = currentArtist.order;

    await prisma.artistListArtist.update({
      where: { id: currentArtist.id },
      data: { order: adjArtist?.order },
    });
    await prisma.artistListArtist.update({
      where: { id: adjArtist?.id },
      data: { order: currArtistOrder },
    });

    return NextResponse.json({});
  } catch (error: any) {
    throw new Error(`Failed to update artist list order. Error: ${error.message}`);
  }
};
