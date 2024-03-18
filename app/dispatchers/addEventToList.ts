import prisma from '@/app/libs/prisma';

interface addEventToListProps {
  listName: string;
  eventId: string;
  startDate: Date;
  endDate?: Date | null;
}

const addEventToList = async ({
  listName,
  eventId,
  startDate,
  endDate = null,
}: addEventToListProps) => {
  const eventList = await prisma.eventList.findUnique({ where: { name: listName } });

  if (!eventList) {
    throw new Error(`Unfound list with name: ${listName}`);
  }

  const firstEventListEvent = await prisma.eventListEvent.findFirst({
    where: {
      eventList: {
        name: listName,
      },
    },
    orderBy: {
      order: 'desc',
    },
  });

  const latestOrder = firstEventListEvent ? firstEventListEvent.order : 0;
  const eventListId = eventList.id;

  await prisma.eventListEvent.create({
    data: {
      eventId,
      eventListId,
      order: latestOrder + 1,
      startDate,
      endDate,
    },
  });
};

export default addEventToList;
