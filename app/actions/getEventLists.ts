import prisma from '@/app/libs/prisma';
import { EventList, EventList_Event } from '../components/admin/Events/EventTable';

export type EventListResponse = EventList & {
  eventListEvent: EventList_Event[];
};

const getEventLists = async () => {
  try {
    const eventLists: EventListResponse[] = await prisma.eventList.findMany({
      include: {
        eventListEvent: {
          orderBy: {
            order: 'desc',
          },
        },
      },
    });

    const formattedLists: EventListResponse[] = eventLists.map((list) => {
      const { eventListEvent, ...listData } = list;
      return {
        ...listData,
        eventListEvent,
      };
    });

    return formattedLists;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getEventLists;
