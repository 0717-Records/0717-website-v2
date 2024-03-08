import prisma from '@/app/libs/prisma';
import { formatArtists } from './getArtists';
import { Artist } from '../components/admin/Artists/ArtistTable';

const getArtistById = async (artistId?: string) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        artistList_artist: {
          include: {
            artistList: true,
          },
        },
      },
    });

    if (!artist) return null;

    const formattedArtist: Artist = formatArtists([artist])[0];

    return formattedArtist;
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2023') return null;
    throw error;
  }
};

export default getArtistById;
