import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const body = await request.json();

    const {
      connectDisplay,
      connectStartDate,
      featuredDisplay,
      featuredStartDate,
      featuredEndDate,
      links,
      ...restOfBody
    } = body;

    // If links are not provided, omit from pass in
    const includeLinks = links !== undefined && links !== null && links.length > 0;
    const eventData = {
      ...restOfBody,
      ...(includeLinks && { links: { create: links } }),
    };

    // Create event
    const event = await prisma.event.create({
      data: eventData,
    });

    // If flagged for connect, calculate order and add to list
    if (connectDisplay) {
      const lastEvent = await prisma.eventList.findFirst({
        where: {
          name: 'connect',
        },
        orderBy: {
          order: 'desc',
        },
        select: {
          order: true,
        },
      });
      const lastOrderNum = lastEvent?.order || 0;
      await prisma.eventList.create({
        data: {
          name: 'connect',
          eventId: event.id,
          startDate: connectStartDate,
          order: lastOrderNum + 1,
        },
      });
    }

    // If flagged for featured, calculate order and add to list
    if (featuredDisplay) {
      const lastEvent = await prisma.eventList.findFirst({
        where: {
          name: 'featured',
        },
        orderBy: {
          order: 'desc',
        },
        select: {
          order: true,
        },
      });
      const lastOrderNum = lastEvent?.order || 0;
      await prisma.eventList.create({
        data: {
          name: 'featured',
          eventId: event.id,
          startDate: featuredStartDate,
          endDate: featuredEndDate,
          order: lastOrderNum + 1,
        },
      });
    }

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
