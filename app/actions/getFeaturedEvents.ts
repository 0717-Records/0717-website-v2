import { PrismaClient } from '@prisma/client';
import { cache } from '../libs/cache';

const prisma = new PrismaClient();

// Function to fetch active 'Featured' events including all fields
const getFeaturedEvents = cache(
  async () => {
    // Current date at midnight (beginning of the day)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Current date at 11:59:59 PM (end of the day)
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const eventListEvents = await prisma.eventListEvent.findMany({
      where: {
        eventList: {
          name: 'featured',
        },
        startDate: {
          lte: endOfDay,
        },
        OR: [{ endDate: null }, { endDate: { gte: startOfDay } }],
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        event: true, // Retrieves all fields of the event
      },
    });

    return eventListEvents.map((e) => e.event);
  },
  ['/', 'getFeaturedEvents'],
  { revalidate: 60 * 60 * 24 }
);

export default getFeaturedEvents;
