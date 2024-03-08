import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { addArtistToList } from '../route';
import validateObject from '@/app/libs/validateObject';

interface IParams {
  artistId: string;
}

export const PUT = async (request: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const { artistId } = params;

    const body = await request.json();
    const data = validateObject(body);
    const { name, description, display, links } = data;
    const { type } = data;

    // Update artist
    await prisma.artist.update({
      where: {
        id: artistId,
      },
      data: { name, description, display, links },
    });

    const listsToAddTo = type === 'both' ? ['explore', 'engage'] : [type];

    // Remove artist from all lists
    await prisma.artistListArtist.deleteMany({
      where: {
        artistId,
      },
    });
    // Add artist to list(s)
    const promises = listsToAddTo.map((list) => addArtistToList({ listName: list, artistId }));
    await Promise.all(promises);

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to update artist right now! Please try again later.', {
      status: 400,
      statusText: 'PUT_LISTING_FAIL',
    });
  }
};
