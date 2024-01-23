import prisma from '@/app/libs/prisma';

const getSections = async () => {
  try {
    const sections = await prisma.section.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return sections;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getSections;
