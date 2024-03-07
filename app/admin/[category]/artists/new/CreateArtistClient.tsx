'use client';

import EditContainer from '@/app/components/admin/EditSection/EditContainer';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Input from '@/app/components/admin/inputs/Input';
import TextArea from '@/app/components/admin/inputs/TextArea';
import YesNoSwitch from '@/app/components/admin/inputs/YesNoSwitch';
import Heading from '@/app/components/admin/typography/Heading';
import Button from '@/app/components/admin/ui/Button';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const CreateArtistClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  return (
    <>
      <HeaderBar>
        <Heading title='Create New Artist' />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => {}}
            // onClick={() => {
            //   reset(defaultValues);
            // }}
          >
            Cancel
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
      <form>
        <EditContainer>
          <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <div className='my-4 bg-yellow-300'>IMAGE INPUT GOES HERE!</div>
          <TextArea
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            rows={5}
          />
          <YesNoSwitch yesDefault label='Display?' />
        </EditContainer>
      </form>
    </>
  );
};

export default CreateArtistClient;
