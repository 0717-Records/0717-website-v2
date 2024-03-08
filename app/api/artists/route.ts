import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

const validateObject = (obj: any) => {
  const reqStringProps = ['name', 'description', 'type'];
  const reqBooleanProps = ['display'];

  // Check properties exist
  [...reqStringProps, ...reqBooleanProps].forEach((prop) => {
    if (!obj.hasOwnProperty(prop))
      throw new NextResponse(`Listing validation failed: '${prop}' not supplied.`, {
        status: 400,
        statusText: 'MISSING_VALUE',
      });
  });

  // Check for non-empty strings
  reqStringProps.forEach((prop) => {
    if (typeof obj[prop] !== 'string' || obj[prop].trim() === '')
      throw new NextResponse(`Listing validation failed: '${prop}' must be a valid string.`, {
        status: 400,
        statusText: 'EMPTY_STRING',
      });
  });

  // Check for boolean types
  reqBooleanProps.forEach((prop) => {
    if (typeof obj[prop] !== 'boolean')
      throw new NextResponse(`Listing validation failed: '${prop}' must be a boolean.`, {
        status: 400,
        statusText: 'NON_BOOLEAN',
      });
  });

  // All conditions passed, return the object
  return obj;
};

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
    const { name, description, display } = data;
    const { type } = data;

    // Create artist
    const artist = await prisma.artist.create({ data: { name, description, display } });

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

interface addArtistToListProps {
  listName: string;
  artistId: string;
}

const addArtistToList = async ({ listName, artistId }: addArtistToListProps) => {
  const list = await prisma.artistList.findUnique({
    where: { name: listName },
    include: {
      artistList_artist: true,
    },
  });

  if (!list) return;
  const numArtists = list.artistList_artist.length;

  await prisma.artistListArtist.create({
    data: {
      artistId,
      artistListId: list.id,
      order: numArtists + 1,
    },
  });
};
