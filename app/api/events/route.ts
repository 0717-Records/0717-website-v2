import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import validateObject from '@/app/libs/validateObject';
import addArtistToList from '@/app/dispatchers/addArtistToList';
import { Artist } from '@prisma/client';

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const body = await request.json();

    // If links are not provided, omit from pass in
    const { links, ...restOfBody } = body;
    const includeLinks = links !== undefined && links !== null && links.length > 0;

    let eventData = {
      ...restOfBody,
      ...(includeLinks && { links: { create: links } }),
    };

    // Calculate order for Connect
    if (body.connectDisplay) {
      const lastEvent = await prisma.event.findFirst({
        where: {
          connectDisplay: true,
        },
        orderBy: {
          connectOrder: 'desc',
        },
        select: {
          connectOrder: true,
        },
      });
      const lastOrderNum = lastEvent?.connectOrder || 0;
      eventData = { ...eventData, connectOrder: lastOrderNum + 1 };
    }

    // Calculate order for Featured
    if (body.featuredDisplay) {
      const lastEvent = await prisma.event.findFirst({
        where: {
          featuredDisplay: true,
        },
        orderBy: {
          featuredOrder: 'desc',
        },
        select: {
          featuredOrder: true,
        },
      });
      const lastOrderNum = lastEvent?.featuredOrder || 0;
      eventData = { ...eventData, featuredOrder: lastOrderNum + 1 };
    }

    // Create event
    const event = await prisma.event.create({
      data: eventData,
    });

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to create event right now! Please try again later.', {
      status: 400,
      statusText: 'POST_LISTING_FAIL',
    });
  }
};
