import prisma from '@/app/libs/prisma';
import { HeroImage } from '../types';
import { cache } from '../libs/cache';

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

export const getHeroImagesCached = cache(getHeroImages, ['/', 'getHeroImages']);

export default getHeroImages;
