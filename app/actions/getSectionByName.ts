import { SectionData } from '@/app/types';
import { PrismaClient } from '@prisma/client';
import buildSectionData from '../constructors/buildSectionData';

const prisma = new PrismaClient();

interface getSectionByNameProps {
  sectionName: string;
  category?: string;
}

const getSectionByName = async ({
  sectionName,
  category,
}: getSectionByNameProps): Promise<SectionData | null> => {
  try {
    const section = await prisma.section.findUnique({
      where: { unique_name: sectionName, category: { name: category } },
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
