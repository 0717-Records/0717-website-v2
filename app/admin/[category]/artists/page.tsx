import React from 'react';
import ArtistTable, { Artist, ArtistList } from '@/app/components/admin/Artists/ArtistTable';
import getArtistLists from '@/app/actions/getArtistLists';
import getArtists from '@/app/actions/getArtists';
import ArtistsClient from './ArtistsClient';

const Artists = async () => {
  const artists: Artist[] = await getArtists();
  const artistLists: ArtistList[] = await getArtistLists();

  return <ArtistsClient artists={artists} artistLists={artistLists} />;
};

export default Artists;
