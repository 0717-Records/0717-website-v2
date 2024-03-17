import prisma from '@/app/libs/prisma';
import { Event, EventList } from '../components/admin/Events/EventTable';

export type EventResponse = Event & {
  eventList: EventList;
};

const getEvents = async () => {
  try {
    const events = await prisma.event.findMany({
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

    const formattedEvents: EventResponse[] = formatEvents(events);

    return formattedEvents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getEvents;

const formatEvents = (events: any[]) =>
  events.map((event) => {
    const { eventListEvent, ...eventData } = event;
    const lists = eventListEvent.map((item: any) => item.eventList);
    return {
      ...eventData,
      lists,
    };
  });
