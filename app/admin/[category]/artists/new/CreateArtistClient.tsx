'use client';

import EditContainer from '@/app/components/admin/EditSection/EditContainer';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Input from '@/app/components/admin/inputs/Input';
import OptionSwitch from '@/app/components/admin/inputs/OptionSwitch';
import TextArea from '@/app/components/admin/inputs/TextArea';
import YesNoSwitch from '@/app/components/admin/inputs/YesNoSwitch';
import Heading from '@/app/components/admin/typography/Heading';
import Button from '@/app/components/admin/ui/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateArtistClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      display: true,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const isDisplayed = watch('display');

  const createArtist: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/artists', data);
      toast.success('Artist created!');
      router.push('/admin/collections/artists');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message =
        message !== '' ? message : 'Cannot create artist right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderBar>
        <Heading title='Create New Artist' />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => router.push('/admin/collections/artists')}>
            Cancel
          </Button>
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(createArtist)(e);
            }}>
            Save
          </Button>
        </div>
      </HeaderBar>
      <form>
        <EditContainer>
          <div className='flex'>
            <div className='basis-2/3 pr-6'>
              <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>

            <div className='my-4 bg-yellow-300 basis-1/3'>IMAGE INPUT GOES HERE!</div>
          </div>

          <TextArea
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            rows={5}
          />
          <YesNoSwitch
            disabled={isLoading}
            value={isDisplayed}
            label='Display?'
            onChange={(value) => setCustomValue('display', value)}
          />
          <div className='mt-6'>
            <OptionSwitch
              label='Type'
              value='fav'
              options={['fav', 'collab', 'both']}
              labels={['Favourite', 'Collaboration', 'Both']}
              onChange={() => {}}
              // onChange={(selection) => setSwitchVal(selection)}
            />
          </div>
        </EditContainer>
        <EditContainer heading='Artist Links'>
          <div className='bg-yellow-300'>ARTIST LINK TABLE GOES HERE!</div>
        </EditContainer>
      </form>
    </>
  );
};

export default CreateArtistClient;
