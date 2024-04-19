import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import getCurrentUser from '@/app/actions/getCurrentUser';
import addEventToList from '@/app/dispatchers/addEventToList';
import { revalidatePath } from 'next/cache';

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
      listName,
      ...restOfBody
    } = body;

    // Create event
    const event = await prisma.event.create({
      data: restOfBody,
    });
    revalidatePath('/');

    interface listToAddTo {
      name: string;
      startDate: Date;
      endDate?: Date;
    }

    let listsToAddTo: listToAddTo[] = [];
    if (connectDisplay && featuredDisplay) {
      listsToAddTo = [
        { name: 'connect', startDate: connectStartDate },
        { name: 'featured', startDate: featuredStartDate, endDate: featuredEndDate },
      ];
    } else {
      if (connectDisplay) listsToAddTo = [{ name: 'connect', startDate: connectStartDate }];
      if (featuredDisplay)
        listsToAddTo = [
          { name: 'featured', startDate: featuredStartDate, endDate: featuredEndDate },
        ];
    }

    // Add artist to list(s)
    const promises = listsToAddTo.map((list) =>
      addEventToList({
        listName: list.name,
        eventId: event.id,
        startDate: list.startDate,
        endDate: list.endDate,
      })
    );
    await Promise.all(promises);

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
