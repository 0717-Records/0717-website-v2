'use client';

import Heading from '@/app/components/Typography/Heading';
import HeaderBar from '@/app/components/admin/HeaderBar';
import HeroImagesTable from '@/app/components/admin/HeroImages/HeroImagesTable';
import Button from '@/app/components/admin/ui/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface AddImageProps {
  imageUrl: string;
  altText?: string;
}

const HeroImagesClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const addImage = async (data: AddImageProps) => {
    setIsLoading(true);
    try {
      await axios.post('/api/hero_images', data);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot add image right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderBar>
        <Heading title='Hero Images' />
        <div className='mb-2'>
          <Button outline onClick={() => router.push('/admin/sections/hero')}>
            Back
          </Button>
        </div>
      </HeaderBar>
      <HeroImagesTable isLoading={isLoading} onAddImage={addImage} />
    </>
  );
};

export default HeroImagesClient;
