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
    const eventList = await prisma.eventList.findUnique({
      where: { name: location },
      include: {
        eventListEvent: {
          orderBy: {
            order: 'desc',
          },
        },
      },
    });
    if (!eventList) throw new Error('Event list not found!');

    const targetIndex = eventList.eventListEvent.findIndex((e) => e.eventId === eventId);
    if (targetIndex === -1) throw new Error('Event not found in the list!');

    const swapIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1;
    if (swapIndex < 0 || swapIndex >= eventList.eventListEvent.length)
      throw new Error('Cannot move in the specified direction');

    await prisma.$transaction([
      prisma.eventListEvent.update({
        where: { id: eventList.eventListEvent[targetIndex].id },
        data: { order: eventList.eventListEvent[swapIndex].order },
      }),
      prisma.eventListEvent.update({
        where: { id: eventList.eventListEvent[swapIndex].id },
        data: { order: eventList.eventListEvent[targetIndex].order },
      }),
    ]);

    return NextResponse.json({});
  } catch (error: any) {
    throw new Error(`Failed to update event list order. Error: ${error.message}`);
  }
};
