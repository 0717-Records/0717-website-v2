import { SectionData } from '@/app/types';
import { PrismaClient } from '@prisma/client';
import buildSectionData from '../constructors/buildSectionData';

const prisma = new PrismaClient();

const getSectionByName = async (sectionName: string): Promise<SectionData | null> => {
  try {
    const section = await prisma.section.findUnique({
      where: { unique_name: sectionName },
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
    throw new Error(error);
  }
};

export default getSectionByName;
