import prisma from '@/app/libs/prisma';
import { Artist } from '../components/admin/Artists/ArtistTable';
import { formatArtists } from './getArtists';
import { DisplayArtist } from '../types';

interface GetDisplayArtistsProps {
  listName?: string;
}

const getDisplayArtists = async ({ listName }: GetDisplayArtistsProps) => {
  try {
    const artists = await prisma.artistList.findUnique({
      where: {
        name: listName,
      },
      select: {
        artistList_artist: {
          where: {
            artist: {
              display: true,
            },
          },
          orderBy: {
            order: 'asc',
          },
          select: {
            artist: {
              select: {
                id: true,
                name: true,
                image: true,
                description: true,
                links: true,
              },
            },
          },
        },
      },
    });

    // Extract the artists from the join table results
    return artists?.artistList_artist.map((ala) => ala.artist) || ([] as DisplayArtist[]);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getDisplayArtists;
