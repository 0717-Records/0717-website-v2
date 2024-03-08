import prisma from '@/app/libs/prisma';

const getArtistLists = async () => {
  try {
    const artistLists = await prisma.artistList.findMany({
      include: {
        artistList_artist: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    const formattedLists = artistLists.map((list) => {
      const { artistList_artist, ...listData } = list;
      const artistIds = artistList_artist.map((item) => item.artistId);
      return {
        ...listData,
        artistIds,
      };
    });

    return formattedLists || [];
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getArtistLists;
