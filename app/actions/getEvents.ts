import prisma from '@/app/libs/prisma';

const getEvents = async () => {
  try {
    const events = await prisma.event.findMany({
      include: {
        links: true,
        eventLists: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return events || ([] as Event[]);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getEvents;
