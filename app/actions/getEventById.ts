import prisma from '@/app/libs/prisma';
import { EventResponse } from './getEvents';

const getEventById = async (eventId?: string) => {
  try {
    const event: EventResponse | null = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        eventListEvent: {
          include: {
            eventList: true,
          },
        },
      },
    });

    if (!event) throw new Error(`Cannot find event with id: ${eventId}`);

    return event;
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2023') return null;
    throw error;
  }
};

export default getEventById;
