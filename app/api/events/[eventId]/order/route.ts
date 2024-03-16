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

    // Check supplied location is valid
    if (location !== 'connect' && location !== 'featured')
      throw new NextResponse('Invalid location!', {
        status: 400,
        statusText: 'INVALID_LOCATION',
      });

    // Check supplied diretion is valid
    if (direction !== 'up' && direction !== 'down')
      throw new NextResponse('Invalid direction!', {
        status: 400,
        statusText: 'INVALID_DIRECTION',
      });

    // Get all events in list
    const events = await prisma.eventList.findMany({
      where: { name: location },
      orderBy: { order: 'desc' },
    });
    const currentIndex = events.findIndex((event) => event.id === eventId);

    // Check event exists in list
    if (!currentIndex) throw new Error('Event not found in list!');

    // Get adjacent event + check event can be moved up/down
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

    // Swap order for current and adjacent event
    const currentEvent = events[currentIndex];
    const currEventOrder = currentEvent.order;
    await prisma.eventList.update({
      where: { id: currentEvent.id },
      data: { order: adjEvent?.order },
    });
    await prisma.eventList.update({
      where: { id: adjEvent?.id },
      data: { order: currEventOrder },
    });

    return NextResponse.json({});
  } catch (error: any) {
    throw new Error(`Failed to update event list order. Error: ${error.message}`);
  }
};
