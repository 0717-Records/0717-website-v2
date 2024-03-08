import prisma from '@/app/libs/prisma';
import { Artist, ArtistListName } from '../components/admin/Artists/ArtistTable';

const getArtists = async (listName?: ArtistListName) => {
  try {
    if (!listName) {
      const artists = await prisma.artist.findMany({
        include: {
          artistList_artist: {
            include: {
              artistList: true,
            },
          },
        },
      });

      const formattedArtists: Artist[] = formatArtists(artists);

      return formattedArtists;
    }

    const artistList = await prisma.artistList.findUnique({
      where: {
        name: listName,
      },
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
    if (!artistList) return [];
    const artistsInList: Artist[] = artistList.artistList_artist.map(
      (artistListArtist) => artistListArtist.artist
    );
    return artistsInList;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getArtists;

export const formatArtists = (artists: any[]) =>
  artists.map((artist: any) => {
    const { artistList_artist, ...artistData } = artist;
    const lists = artistList_artist.map((item: any) => item.artistList);
    return {
      ...artistData,
      lists,
    };
  });
