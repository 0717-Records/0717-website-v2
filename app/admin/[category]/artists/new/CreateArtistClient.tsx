'use client';

import CreateEditArtistForm from '@/app/components/admin/Artists/CreateEditArtistForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateArtistClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createArtist: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/artists', data);
      toast.success('Artist created!');
      router.push('/admin/collections/artists');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message =
        message !== '' ? message : 'Cannot create artist right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    display: true,
    type: 'engage',
    links: [],
  };

  return (
    <CreateEditArtistForm
      title='Create New Artist'
      isLoading={isLoading}
      onSubmit={createArtist}
      defaultValues={defaultValues}
    />
  );
};

export default CreateArtistClient;
