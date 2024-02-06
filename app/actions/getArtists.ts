import prisma from '@/app/libs/prisma';
import { ArtistData, ArtistListName } from '../components/admin/Artists/ArtistTable';

const getArtists = async (listName?: ArtistListName) => {
  try {
    const artists = await prisma.artist.findMany();
    if (!listName) return artists;
    const artistList = await prisma.artistList.findUnique({
      where: {
        name: listName,
      },
    });
    if (!artistList) return [];
    const filteredArtists = artistList.artistIds
      .map((id) => artists.find((artist) => artist.id === id))
      .filter((artist) => artist !== undefined) as ArtistData[];
    return filteredArtists;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getArtists;
