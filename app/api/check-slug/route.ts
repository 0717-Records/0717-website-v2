import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { slug, currentId } = body;
    if (!slug) throw new Error('Slug required!');
    const existingArtist = await prisma.artist.findFirst({
      where: {
        slug,
        NOT: {
          id: currentId,
        },
      },
    });
    return NextResponse.json({ exists: !!existingArtist });
  } catch (error: any) {
    console.error('Error checking validity of slug: ', error);
    return new NextResponse('Error checking validity of slug', {
      status: 400,
      statusText: 'SLUG_CHECK_ERROR',
    });
  }
};
