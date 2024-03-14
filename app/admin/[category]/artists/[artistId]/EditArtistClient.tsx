'use client';

import { Artist, ListData } from '@/app/components/admin/Artists/ArtistTable';
import CreateEditArtistForm from '@/app/components/admin/Artists/CreateEditArtistForm';
import { deleteImgFromCloudinary } from '@/app/components/admin/ImageUpload';
import Button from '@/app/components/admin/ui/Button';
import { useModal } from '@/app/hooks/useModal';
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
  const { openModal } = useModal();

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

  const deleteArtist = () => {
    // logic for delete artist
  };

  const openDeleteModal = () => {
    openModal({
      title: 'Delete Artist',
      variant: 'danger',
      description: 'Are you sure you want to delete this artist?  This action cannot be undone!',
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete',
      onCancel: () => {
        console.log('My custom code to run on cancel click.');
      },
      onConfirm: () => {
        console.log('My custom code to run on confirm click.');
      },
    });

    // modal.custom.open({
    //   content: <MyCustomModal />,
    // });
  };

  // const MyCustomModal = () => {
  //   return <div>Hello</div>;
  // };

  const defaultValues = {
    name: artist.name,
    description: artist.description,
    display: artist.display,
    type: getListType(artist.lists || []),
    links: artist.links || [],
    imageSrc: artist.image,
  };

  return (
    <>
      <CreateEditArtistForm
        title={artist.name}
        isLoading={isLoading}
        onSubmit={updateArtist}
        defaultValues={defaultValues}
        secondaryButtonLabel='Back'
        isEdit
      />
      <Button
        onClick={openDeleteModal}
        outline
        className='hover:bg-red-500 hover:opacity-100 hover:text-white hover:border-red-500'>
        Delete Artist
      </Button>
    </>
  );
};

export default EditArtistClient;

const getListType = (lists: ListData[]) => {
  if (lists.length === 0) return '';
  if (lists.length > 1) return 'both';
  return lists[0].name;
};
