import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import validateObject from '@/app/libs/validateObject';
import addArtistToList from '@/app/dispatchers/addArtistToList';

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const body = await request.json();
    const data = validateObject(body);
    const { name, slug, description, display, links, imageSrc, type } = data;

    // Create artist
    const artist = await prisma.artist.create({
      data: { name, slug, description, display, links, image: imageSrc },
    });

    const listsToAddTo = type === 'both' ? ['explore', 'engage'] : [type];

    // Add artist to list(s)
    const promises = listsToAddTo.map((list) =>
      addArtistToList({ listName: list, artistId: artist.id })
    );
    await Promise.all(promises);

    return NextResponse.json(artist);
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to create artist right now! Please try again later.', {
      status: 400,
      statusText: 'POST_LISTING_FAIL',
    });
  }
};
