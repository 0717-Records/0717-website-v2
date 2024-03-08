import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

const validateObject = (obj: any) => {
  const reqStringProps = ['name', 'description'];
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
    const artist = await prisma.artist.create({ data });

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
