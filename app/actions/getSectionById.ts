import prisma from '@/app/libs/prisma';
import buildSectionData from '../constructors/buildSectionData';

const getSectionById = async (sectionId?: string) => {
  try {
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        component_section: {
          include: {
            component: {
              include: {
                fields: {
                  orderBy: {
                    order: 'asc',
                  },
                  include: {
                    fieldType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!section) return null;

    return buildSectionData(section);
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export default getSectionById;
