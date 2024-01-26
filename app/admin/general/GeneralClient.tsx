'use client';

import MyHeading from '@/app/components/typography/MyHeading';
import Button from '@/app/components/ui/Button';
import React from 'react';

const GeneralClient = () => {
  return (
    <div>
      <MyHeading title='General' subTitle='General settings for 07:17 records.' />
      <Button disabled>Test Button</Button>
      <Button>Test Button</Button>
      <Button outline>Test Button</Button>
      <Button disabled outline>
        Test Button
      </Button>
      <Button small>Test Button</Button>
      <Button small outline>
        Test Button
      </Button>
    </div>
  );
};

export default GeneralClient;
