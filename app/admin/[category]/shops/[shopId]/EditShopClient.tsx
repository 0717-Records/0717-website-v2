'use client';

import { ModalVariants } from '@/app/components/Modal/Modal';
import { deleteImgFromCloudinary } from '@/app/components/admin/ImageUpload';
import CreateEditShopForm from '@/app/components/admin/Shops/CreateEditShopForm';
import { Shop } from '@/app/components/admin/Shops/ShopTable';
import Button from '@/app/components/admin/ui/Button';
import { useModal } from '@/app/hooks/useModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditShopClientProps {
  shop: Shop;
}

const EditShopClient = ({ shop }: EditShopClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();

  const updateShop: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const currentImgUrl = shop.image;
    try {
      // Update shop
      await axios.put(`/api/shops/${shop.id}`, data);
      toast.success('Shop updated!');
      router.push('/admin/collections/shops');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot update shop right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
    // Cleanup cloudinary if required
    if (currentImgUrl && data.imageSrc !== currentImgUrl)
      deleteImgFromCloudinary({ url: currentImgUrl });
  };

  const deleteShop = async () => {
    setIsLoading(true);
    const currentImgUrl = shop.image;
    try {
      // Delete shop
      await axios.delete(`/api/artists/${shop.id}`);
      toast.success(`${shop.name} deleted!`);
      router.push('/admin/collections/shops');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot delete shop right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
    // Cleanup cloudinary if required
    if (currentImgUrl) deleteImgFromCloudinary({ url: currentImgUrl });
  };

  const openDeleteModal = () => {
    openModal({
      title: `Delete ${shop.name}?`,
      variant: ModalVariants.Warning,
      description: (
        <>
          Are you sure you want to delete {shop.name}? This action cannot be undone!
          <br />
          <br />
          Alternatively you could 'hide' it from the public website without deleting them by
          toggling the Display switch on the Edit Shop page.
        </>
      ),
      confirmLabel: 'Delete',
      onConfirm: deleteShop,
    });
  };

  const defaultValues = {
    name: shop.name,
    url: shop.url,
    description: shop.description,
    display: shop.display,
    imageSrc: shop.image,
  };

  return (
    <>
      <CreateEditShopForm
        title={shop.name}
        isLoading={isLoading}
        onSubmit={updateShop}
        defaultValues={defaultValues}
        secondaryButtonLabel='Back'
        isEdit
        currentId={shop.id}
      />
      <Button
        onClick={openDeleteModal}
        outline
        className='hover:bg-red-500 hover:opacity-100 hover:text-white hover:border-red-500'>
        Delete Shop
      </Button>
    </>
  );
};

export default EditShopClient;
