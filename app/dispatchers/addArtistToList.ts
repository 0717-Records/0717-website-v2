import prisma from '@/app/libs/prisma';

interface addArtistToListProps {
  listName: string;
  artistId: string;
}

const addArtistToList = async ({ listName, artistId }: addArtistToListProps) => {
  const list = await prisma.artistList.findUnique({
    where: { name: listName },
    include: {
      artistList_artist: true,
    },
  });

  if (!list) return;
  const numArtists = list.artistList_artist.length;

  await prisma.artistListArtist.create({
    data: {
      artistId,
      artistListId: list.id,
      order: numArtists + 1,
    },
  });
};

export default addArtistToList;
