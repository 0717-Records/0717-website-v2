import prisma from '@/app/libs/prisma';
import { HeroImage } from '../types';

const getHeroImages = async () => {
  try {
    const images: HeroImage[] = await prisma.heroImages.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return images;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getHeroImages;
