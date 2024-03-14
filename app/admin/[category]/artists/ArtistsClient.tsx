'use client';

import ArtistTable, { Artist, ArtistList } from '@/app/components/my-admin/Artists/ArtistTable';
import HeaderBar from '@/app/components/my-admin/HeaderBar';
import Heading from '@/app/components/my-admin/Typography/Heading';
import MyLink from '@/app/components/my-admin/ui/MyLink';
import React from 'react';

interface ArtistClientProps {
  artists: Artist[];
  artistLists: ArtistList[];
}

const ArtistsClient = ({ artists, artistLists }: ArtistClientProps) => {
  return (
    <>
      <HeaderBar>
        <Heading title='Artists' />
        <MyLink
          className='mb-2 bg-blue-500'
          href='/admin/collections/artists/new'
          type='button-regular'>
          Add Artist
        </MyLink>
      </HeaderBar>
      <ArtistTable artists={artists} artistLists={artistLists} />
    </>
  );
};

export default ArtistsClient;
