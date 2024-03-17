import prisma from '@/app/libs/prisma';
import { Event, EventList } from '../components/admin/Events/EventTable';
import { EventListEvent } from '@prisma/client';

export type EventResponse = Event & {
  eventListEvent: (EventListEvent & {
    eventList: EventList;
  })[];
};

const getEvents = async () => {
  try {
    const events: EventResponse[] = await prisma.event.findMany({
      include: {
        eventListEvent: {
          include: {
            eventList: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getEvents;
