import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  eventId: string;
}

interface dataTypes {
  location: 'connect' | 'featured';
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

    const { eventId } = params;
    const { location, direction }: dataTypes = await request.json();

    if (location !== 'connect' && location !== 'featured')
      throw new NextResponse('Invalid location!', {
        status: 400,
        statusText: 'INVALID_LOCATION',
      });

    let query = {};
    if (location === 'connect') {
      query = {
        where: { connectDisplay: true },
        orderBy: {
          connectOrder: 'desc',
        },
      };
    }
    if (location === 'featured') {
      query = {
        where: { featuredDisplay: true },
        orderBy: {
          featuredOrder: 'desc',
        },
      };
    }

    const events = await prisma.event.findMany(query);

    const currentIndex = events.findIndex((event) => event.id === eventId);
    if (currentIndex === -1) throw new Error('Event not found in list!');

    let adjEvent;
    if (direction === 'up') {
      if (currentIndex === 0) throw new Error('Event is already at the top of the list');
      adjEvent = events[currentIndex - 1];
    }
    if (direction === 'down') {
      if (currentIndex === events.length - 1)
        throw new Error('Event is already at the bottom of the list');
      adjEvent = events[currentIndex + 1];
    }

    if (location === 'connect') {
      const currentEvent = events[currentIndex];
      const currEventOrder = currentEvent.connectOrder;

      await prisma.event.update({
        where: { id: currentEvent.id },
        data: { connectOrder: adjEvent?.connectOrder },
      });
      await prisma.event.update({
        where: { id: adjEvent?.id },
        data: { connectOrder: currEventOrder },
      });
    }
    if (location === 'featured') {
      const currentEvent = events[currentIndex];
      const currEventOrder = currentEvent.featuredOrder;

      await prisma.event.update({
        where: { id: currentEvent.id },
        data: { featuredOrder: adjEvent?.featuredOrder },
      });
      await prisma.event.update({
        where: { id: adjEvent?.id },
        data: { featuredOrder: currEventOrder },
      });
    }

    return NextResponse.json({});
  } catch (error: any) {
    throw new Error(`Failed to update event list order. Error: ${error.message}`);
  }
};
