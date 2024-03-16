import prisma from '@/app/libs/prisma';

const getEventListByName = async (name: string) => {
  try {
    const eventList = await prisma.eventList.findMany({
      where: { name },
      include: {
        event: true,
      },
      orderBy: {
        order: 'desc',
      },
    });

    return eventList || [];
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getEventListByName;
