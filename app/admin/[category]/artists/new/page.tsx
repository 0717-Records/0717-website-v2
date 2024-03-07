'use client';

import HeaderBar from '@/app/components/admin/HeaderBar';
import MyHeading from '@/app/components/typography/Heading';
import Button from '@/app/components/ui/Button';
import React, { useState } from 'react';

const CreateArtist = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <HeaderBar>
        <MyHeading title='Create New Artist' />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => {}}
            // onClick={() => {
            //   reset(defaultValues);
            // }}
          >
            Reset
          </Button>
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={() => {}}
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleSubmit(updateSection)(e);
            // }}
          >
            Save
          </Button>
        </div>
      </HeaderBar>
    </>
  );
};

export default CreateArtist;
