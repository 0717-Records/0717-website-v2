import React from 'react';
import ScrollToTop from '@/app/components/my-admin/ScrollToTop';
import EmptyState from '@/app/components/my-admin/EmptyState';
import getArtistById from '@/app/actions/getArtistById';
import EditArtistClient from './EditArtistClient';

interface IParams {
  artistId?: string;
}

const CreateArtist = async ({ params }: { params: IParams }) => {
  const { artistId } = params;
  if (!artistId) return <EmptyState />;
  const artist = await getArtistById(artistId);

  if (!artist)
    return (
      <EmptyState
        title='Unknown Artist!'
        subtitle={`Unable to find artist with ID: "${artistId}"`}
      />
    );
  return (
    <>
      <ScrollToTop />
      <EditArtistClient artist={artist} />
    </>
  );
};

export default CreateArtist;
