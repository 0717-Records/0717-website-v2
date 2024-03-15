'use client';

import CreateEditArtistForm from '@/app/components/admin/Artists/CreateEditArtistForm';
import CreateEditEventForm from '@/app/components/admin/Events/CreateEditEventForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateEventClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createEvent: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/events', data);
      toast.success('Event created!');
      router.push('/admin/collections/events');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot create event right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    connectDisplay: true,
    connectStartDate: new Date(),
    featuredDisplay: false,
    featuredStartDate: new Date(),
    links: [],
    shadowDisplay: false,
    shadowStartDate: new Date(),
  };

  return (
    <CreateEditEventForm
      title='Create New Event'
      isLoading={isLoading}
      onSubmit={createEvent}
      defaultValues={defaultValues}
    />
  );
};

export default CreateEventClient;
