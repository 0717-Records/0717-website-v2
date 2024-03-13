'use client';

import { Artist, ListData } from '@/app/components/admin/Artists/ArtistTable';
import CreateEditArtistForm from '@/app/components/admin/Artists/CreateEditArtistForm';
import { deleteImgFromCloudinary } from '@/app/components/admin/ImageUpload';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditArtistClientProps {
  artist: Artist;
}

const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

const EditArtistClient = ({ artist }: EditArtistClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateArtist: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const currentImgUrl = artist.image;
    try {
      // Update artist
      await axios.put(`/api/artists/${artist.id}`, data);
      toast.success('Artist updated!');
      router.push('/admin/collections/artists');
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
    console.log(currentImgUrl);
    // Cleanup cloudinary if required
    if (currentImgUrl && data.imageSrc !== currentImgUrl)
      deleteImgFromCloudinary({ folderName, url: currentImgUrl });
  };

  const defaultValues = {
    name: artist.name,
    description: artist.description,
    display: artist.display,
    type: getListType(artist.lists || []),
    links: artist.links || [],
    imageSrc: artist.image,
  };

  return (
    <CreateEditArtistForm
      title={artist.name}
      isLoading={isLoading}
      onSubmit={updateArtist}
      defaultValues={defaultValues}
      secondaryButtonLabel='Back'
      isEdit
    />
  );
};

export default EditArtistClient;

const getListType = (lists: ListData[]) => {
  if (lists.length === 0) return '';
  if (lists.length > 1) return 'both';
  return lists[0].name;
};
