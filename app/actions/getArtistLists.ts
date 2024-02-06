import prisma from '@/app/libs/prisma';

const getArtistLists = async () => {
  try {
    return await prisma.artistList.findMany();
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getArtistLists;
