'use client';

import ArtistTable, { Artist, ArtistList } from '@/app/components/admin/Artists/ArtistTable';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Heading from '@/app/components/admin/typography/Heading';
import MyLink from '@/app/components/admin/ui/MyLink';
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
