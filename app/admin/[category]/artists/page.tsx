import React from 'react';
import { Artist, ArtistList } from '@/app/components/my-admin/Artists/ArtistTable';
import getArtistLists from '@/app/actions/getArtistLists';
import getArtists from '@/app/actions/getArtists';
import ArtistsClient from './ArtistsClient';
import ScrollToTop from '@/app/components/my-admin/ScrollToTop';

const Artists = async () => {
  const artists: Artist[] = await getArtists();
  const artistLists: ArtistList[] = await getArtistLists();

  return (
    <>
      <ScrollToTop />
      <ArtistsClient artists={artists} artistLists={artistLists} />
    </>
  );
};

export default Artists;
