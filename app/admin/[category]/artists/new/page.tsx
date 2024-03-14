'use client';

import React, { useState } from 'react';
import CreateArtistClient from './CreateArtistClient';
import ScrollToTop from '@/app/components/my-admin/ScrollToTop';

const CreateArtist = () => (
  <>
    <ScrollToTop />
    <CreateArtistClient />
  </>
);

export default CreateArtist;
