import prisma from '@/app/libs/prisma';

interface addArtistToListProps {
  listName: string;
  artistId: string;
}

const addArtistToList = async ({ listName, artistId }: addArtistToListProps) => {
  const list = await prisma.artistList.findUnique({
    where: { name: listName },
    include: {
      artistList_artist: {
        include: {
          artist: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!list) return;
  const numArtists = list.artistList_artist.length;
  const lastArtistOrderNum = numArtists === 0 ? 0 : list.artistList_artist[numArtists - 1].order;

  await prisma.artistListArtist.create({
    data: {
      artistId,
      artistListId: list.id,
      order: lastArtistOrderNum + 1,
    },
  });
};

export default addArtistToList;
