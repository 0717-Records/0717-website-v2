'use client';

import ArtistTable, { Artist, ArtistList } from '@/app/components/admin/Artists/ArtistTable';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Heading from '@/app/components/admin/typography/Heading';
import MyLink from '@/app/components/admin/ui/MyLink';
import React, { useState } from 'react';

interface ArtistClientProps {
  artists: Artist[];
  artistLists: ArtistList[];
}

const ArtistsClient = ({ artists, artistLists }: ArtistClientProps) => {
  return (
    <>
      <HeaderBar>
        <Heading title='Artists' />
        <div className='mb-2'>
          <MyLink href='/admin/collections/artists/new' type='button-regular'>
            Add Artist
          </MyLink>
        </div>
      </HeaderBar>
      <ArtistTable artists={artists} artistLists={artistLists} />
    </>
  );
};

export default ArtistsClient;
