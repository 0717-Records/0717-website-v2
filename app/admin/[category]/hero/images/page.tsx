import React from 'react';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import HeroImagesClient from './HeroImagesClient';
import { HeroImage } from '@/app/types';
import getHeroImages from '@/app/actions/getHeroImages';

const CreateEvent = async () => {
  const images: HeroImage[] = await getHeroImages();

  return (
    <>
      <ScrollToTop />
      <HeroImagesClient images={images} />
    </>
  );
};

export default CreateEvent;
