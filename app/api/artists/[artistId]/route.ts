import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import validateObject from '@/app/libs/validateObject';
import addArtistToList from '@/app/dispatchers/addArtistToList';
import getArtistById from '@/app/actions/getArtistById';

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
    const { name, slug, description, display, links, imageSrc, type } = data;

    // Update artist
    await prisma.artist.update({
      where: {
        id: artistId,
      },
      data: { name, slug, description, display, links, image: imageSrc },
    });

    // Get current list and future list
    const artist = await getArtistById(artistId);
    const currentListNames = artist?.lists?.map((list) => list.name) || [];
    const currentListIds = artist?.lists?.map((list) => list.id) || [];
    const futureListNames = type === 'both' ? ['explore', 'engage'] : [type];

    let promises;
    promises = futureListNames.map((list) =>
      prisma.artistList.findUnique({ where: { name: list } })
    );
    const futureLists = await Promise.all(promises);
    const futureListIds = futureLists.map((list) => list?.id || '');

    const listsToRemoveFrom = [];
    const listsToAddTo = [];

    // Find lists to remove from
    for (const value of currentListIds) {
      if (!futureListIds.includes(value)) {
        listsToRemoveFrom.push(value);
      }
    }

    // Find lists to add to
    for (const value of futureListNames) {
      if (!currentListNames.includes(value)) {
        listsToAddTo.push(value);
      }
    }

    // Remove artist from list(s)
    promises = listsToRemoveFrom.map((list) =>
      prisma.artistListArtist.deleteMany({
        where: {
          artistId,
          artistListId: list,
        },
      })
    );
    await Promise.all(promises);

    // Add artist to list(s)
    promises = listsToAddTo.map((list) => addArtistToList({ listName: list, artistId }));
    await Promise.all(promises);

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to update artist right now! Please try again later.', {
      status: 400,
      statusText: 'PUT_ARTIST_FAIL',
    });
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

    const { artistId } = params;

    // Delete artist
    await prisma.artist.delete({
      where: {
        id: artistId,
      },
    });

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to delete artist right now! Please try again later.', {
      status: 400,
      statusText: 'DELETE_ARTIST_FAIL',
    });
  }
};
