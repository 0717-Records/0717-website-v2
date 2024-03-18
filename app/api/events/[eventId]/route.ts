import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import getEventById from '@/app/actions/getEventById';
import addEventToList from '@/app/dispatchers/addEventToList';
import { EventResponse } from '@/app/actions/getEvents';

interface IParams {
  eventId: string;
}

interface IRequestData {
  name?: string;
  imageSrc?: string;
  imageUrl?: string;
  shadowDisplay?: boolean;
  shadowStartDate?: Date;
  shadowEndDate?: Date | null;
  shadowMessage?: string;
  links?: string;
  connectDisplay?: boolean;
  connectStartDate?: Date;
  featuredDisplay?: boolean;
  featuredStartDate?: Date;
  featuredEndDate?: Date;
}

export const PUT = async (request: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });
    }

    const { eventId } = params;

    const event = await getEventById(eventId);
    if (!event) {
      throw new NextResponse(`Event not found in database: ${eventId}`, {
        status: 404,
        statusText: 'EVENT_NOT_FOUND',
      });
    }

    const requestData: IRequestData = await request.json();

    const {
      connectDisplay,
      connectStartDate,
      featuredDisplay,
      featuredStartDate,
      featuredEndDate,
      ...eventData
    } = requestData;

    await prisma.$transaction(async (prismaClient) => {
      await prismaClient.event.update({
        where: { id: eventId },
        data: eventData,
      });

      await updateEventLists(event, requestData);
    });

    return new NextResponse('Event updated successfully', { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error instanceof NextResponse) {
      return error;
    }

    return new NextResponse('Unable to update event. Please try again later.', {
      status: 500,
      statusText: 'INTERNAL_SERVER_ERROR',
    });
  }
};

const updateEventLists = async (event: EventResponse, eventData: IRequestData) => {
  const { connectDisplay, connectStartDate, featuredDisplay, featuredStartDate, featuredEndDate } =
    eventData;

  const futureListsToAdd: { name: string; startDate: Date; endDate: Date | null }[] = [];
  if (connectDisplay) {
    futureListsToAdd.push({ name: 'connect', startDate: connectStartDate!, endDate: null });
  }
  if (featuredDisplay) {
    futureListsToAdd.push({
      name: 'featured',
      startDate: featuredStartDate!,
      endDate: featuredEndDate || null,
    });
  }

  const eventLists = await prisma.eventList.findMany();
  const futureListIds = futureListsToAdd.map(
    (list) => eventLists.find((l) => l.name === list.name)?.id
  );

  const currentListNames = event.eventListEvent.map((item) => item.eventList.name);
  const currentListIds = event.eventListEvent.map((item) => item.eventList.id);

  const listsToRemoveFrom = currentListIds.filter((id: string) => !futureListIds.includes(id));
  const listsToAddTo = futureListsToAdd.filter((list) => !currentListNames.includes(list.name));

  await Promise.all([
    prisma.eventListEvent.deleteMany({
      where: {
        eventId: event.id,
        eventListId: { in: listsToRemoveFrom },
      },
    }),
    ...listsToAddTo.map((list) =>
      addEventToList({
        listName: list.name,
        eventId: event.id,
        startDate: list.startDate,
        endDate: list.endDate,
      })
    ),
  ]);
};

export const DELETE = async (request: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new NextResponse('Please log in first!', {
        status: 400,
        statusText: 'NO_CURRENT_USER',
      });

    const { eventId } = params;

    // Delete event
    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to delete event right now! Please try again later.', {
      status: 400,
      statusText: 'DELETE_EVENT_FAIL',
    });
  }
};
