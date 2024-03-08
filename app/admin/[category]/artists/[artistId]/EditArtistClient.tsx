'use client';

import { Artist, ListData } from '@/app/components/admin/Artists/ArtistTable';
import CreateEditArtistForm from '@/app/components/admin/Artists/CreateEditArtistForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditArtistClientProps {
  artist: Artist;
}

const EditArtistClient = ({ artist }: EditArtistClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateArtist: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.put(`/api/artists/${artist.id}`, data);
      toast.success('Artist updated!');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message =
        message !== '' ? message : 'Cannot update artist right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    name: artist.name,
    description: artist.description,
    display: artist.display,
    type: getListType(artist.lists || []),
    links: artist.links || [],
  };

  return (
    <CreateEditArtistForm
      title='Create New Artist'
      isLoading={isLoading}
      onSubmit={updateArtist}
      defaultValues={defaultValues}
    />
  );
};

export default EditArtistClient;

const getListType = (lists: ListData[]) => {
  if (lists.length === 0) return '';
  if (lists.length > 1) return 'both';
  return lists[0].name;
};
