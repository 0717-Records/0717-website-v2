'use client';

import CreateEditShopForm from '@/app/components/admin/Shops/CreateEditShopForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateShopClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createShop: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/shops', data);
      toast.success('Shop created!');
      router.push('/admin/collections/shops');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot create shop right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    display: true,
  };

  return (
    <CreateEditShopForm
      title='Create New Shop'
      isLoading={isLoading}
      onSubmit={createShop}
      defaultValues={defaultValues}
    />
  );
};

export default CreateShopClient;
