'use client';

import { ModalVariants } from '@/app/components/Modal/Modal';
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
    // Cleanup cloudinary if required
    if (currentImgUrl && data.imageSrc !== currentImgUrl)
      deleteImgFromCloudinary({ url: currentImgUrl });
  };

  const deleteArtist = async () => {
    setIsLoading(true);
    const currentImgUrl = artist.image;
    try {
      // Delete artist
      await axios.delete(`/api/artists/${artist.id}`);
      toast.success(`${artist.name} deleted!`);
      router.push('/admin/collections/artists');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message =
        message !== '' ? message : 'Cannot delete artist right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
    // Cleanup cloudinary if required
    if (currentImgUrl) deleteImgFromCloudinary({ url: currentImgUrl });
  };

  const openDeleteModal = () => {
    openModal({
      title: `Delete ${artist.name}?`,
      variant: ModalVariants.Warning,
      description: (
        <>
          Are you sure you want to delete {artist.name}? This action cannot be undone!
          <br />
          <br />
          Alternatively you could 'hide' them from the public website without deleting them by
          toggling the Display switch on the Edit Artist page.
        </>
      ),
      confirmLabel: 'Delete',
      onConfirm: deleteArtist,
    });
  };

  const defaultValues = {
    name: artist.name,
    slug: artist.slug,
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
