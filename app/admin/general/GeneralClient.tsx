'use client';

import HeaderBar from '@/app/components/admin/HeaderBar';
import MyHeading from '@/app/components/typography/MyHeading';
import Button from '@/app/components/ui/Button';
import React from 'react';

const GeneralClient = () => {
  return (
    <>
      <HeaderBar>
        <MyHeading title='General' />
      </HeaderBar>
    </>
  );
};

export default GeneralClient;
