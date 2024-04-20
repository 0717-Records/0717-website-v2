'use client';

import Heading from '@/app/components/Typography/Heading';
import HeaderBar from '@/app/components/admin/HeaderBar';
import HeroImagesTable from '@/app/components/admin/HeroImages/HeroImagesTable';
import Button from '@/app/components/admin/ui/Button';
import { useRouter } from 'next/navigation';

const HeroImagesClient = () => {
  const router = useRouter();

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
      <HeroImagesTable />
    </>
  );
};

export default HeroImagesClient;
