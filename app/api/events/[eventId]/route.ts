// import prisma from '@/app/libs/prisma';
// import getCurrentUser from '@/app/actions/getCurrentUser';
// import { NextResponse } from 'next/server';
// import getEventById from '@/app/actions/getEventById';
// import addEventToList from '@/app/dispatchers/addEventToList';

// interface IParams {
//   eventId: string;
// }

// export const PUT = async (request: Request, { params }: { params: IParams }) => {
//   try {
//     const currentUser = await getCurrentUser();

//     if (!currentUser)
//       throw new NextResponse('Please log in first!', {
//         status: 400,
//         statusText: 'NO_CURRENT_USER',
//       });

//     const { eventId } = params;

//     // Get current event now (for later) and check it exists
//     const event = await getEventById(eventId);
//     if (!event) throw new Error(`Cannot update event as it does not exist in database: ${eventId}`);

//     const body = await request.json();
//     const {
//       connectDisplay,
//       connectStartDate,
//       featuredDisplay,
//       featuredStartDate,
//       featuredEndDate,
//       ...restOfData
//     } = body;

//     // Update event
//     await prisma.event.update({
//       where: {
//         id: eventId,
//       },
//       data: restOfData,
//     });

//     interface futureListDataTypes {
//       name: string;
//       startDate: Date;
//       endDate: Date | null;
//     }

//     // Get current list and future list
//     const currentListNames = event.eventListEvent.map((item) => item.eventList.name);
//     const currentListIds = event.eventListEvent.map((item) => item.eventList.id);
//     const futureListData: futureListDataTypes[] = [];
//     if (connectDisplay)
//       futureListData.push({ name: 'connect', startDate: connectStartDate, endDate: null });
//     if (featuredDisplay)
//       futureListData.push({
//         name: 'featured',
//         startDate: featuredStartDate,
//         endDate: featuredEndDate,
//       });

//     let promises;
//     promises = futureListData.map((listData) =>
//       prisma.eventList.findUnique({ where: { name: listData.name } })
//     );
//     const futureLists = await Promise.all(promises);
//     const futureListIds = futureLists.map((list) => list?.id || '');

//     const listsToRemoveFrom = [];
//     const listsToAddTo = [];

//     // Find lists to remove from
//     for (const value of currentListIds) {
//       if (!futureListIds.includes(value)) {
//         listsToRemoveFrom.push(value);
//       }
//     }

//     // Find lists to add to
//     for (const value of futureListData) {
//       if (!currentListNames.includes(value.name)) {
//         listsToAddTo.push(value);
//       }
//     }

//     // Remove event from list(s)
//     promises = listsToRemoveFrom.map((list) =>
//       prisma.eventListEvent.deleteMany({
//         where: {
//           eventId,
//           eventListId: list,
//         },
//       })
//     );
//     await Promise.all(promises);

//     // Add event to list(s)
//     promises = listsToAddTo.map((item) =>
//       addEventToList({
//         listName: item.name,
//         eventId,
//         startDate: item.startDate,
//         endDate: item.endDate,
//       })
//     );
//     await Promise.all(promises);

//     return NextResponse.json({});
//   } catch (error: any) {
//     console.error(error);

//     if (error?.statusText) return error;

//     return new NextResponse('Unable to update event right now! Please try again later.', {
//       status: 400,
//       statusText: 'PUT_EVENT_FAIL',
//     });
//   }
// };

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
    // const currentUser = await getCurrentUser();

    // if (!currentUser)
    //   throw new NextResponse('Please log in first!', {
    //     status: 400,
    //     statusText: 'NO_CURRENT_USER',
    //   });

    // const { artistId } = params;

    // // Delete artist
    // await prisma.artist.delete({
    //   where: {
    //     id: artistId,
    //   },
    // });

    console.log('MADE IT TO DELETE EVENT ROUTE!');

    return NextResponse.json({});
  } catch (error: any) {
    console.error(error);

    if (error?.statusText) return error;

    return new NextResponse('Unable to delete artist right now! Please try again later.', {
      status: 400,
      statusText: 'DELETE_ARTIST_FAIL',
    });
  }
};
