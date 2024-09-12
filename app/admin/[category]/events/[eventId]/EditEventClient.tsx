'use client';

import { EventResponse } from '@/app/actions/getEvents';
import { ModalVariants } from '@/app/components/Modal/Modal';
import CreateEditEventForm from '@/app/components/admin/Events/CreateEditEventForm';
import { deleteImgFromCloudinary } from '@/app/components/admin/ImageUpload';
import Button from '@/app/components/admin/ui/Button';
import { useModal } from '@/app/hooks/useModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditEventClientProps {
  event: EventResponse;
}

const EditEventClient = ({ event }: EditEventClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();

  const updateEvent: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const currentImgSrc = event.imageSrc;
    try {
      // Update event
      await axios.put(`/api/events/${event.id}`, data);
      toast.success('Event updated!');
      router.push('/admin/collections/events');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot update event right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async () => {
    setIsLoading(true);
    const currentImgSrc = event.imageSrc;
    try {
      // Delete event
      await axios.delete(`/api/events/${event.id}`);
      toast.success(`${event.name} deleted!`);
      router.push('/admin/collections/events');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot delete event right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
    // Cleanup cloudinary if required
    if (currentImgSrc) deleteImgFromCloudinary({ url: currentImgSrc });
  };

  const openDeleteModal = () => {
    openModal({
      title: `Delete ${event.name}?`,
      variant: ModalVariants.Warning,
      description: (
        <>
          Are you sure you want to delete {event.name}? This action cannot be undone!
          <br />
          <br />
          Alternatively you could 'hide' it from the public website without deleting them by editing
          the Display switches/dates on the Edit Event page.
        </>
      ),
      confirmLabel: 'Delete',
      onConfirm: deleteEvent,
    });
  };

  const connectData = event.eventListEvent.find((item) => item.eventList.name === 'connect');
  const featuredData = event.eventListEvent.find((item) => item.eventList.name === 'featured');

  const defaultValues = {
    name: event.name,
    imageSrc: event.imageSrc,
    imageUrl: event.imageUrl,
    shadowDisplay: event.shadowDisplay,
    shadowStartDate: event.shadowStartDate,
    shadowEndDate: event.shadowEndDate,
    shadowMessage: event.shadowMessage,
    links: event.links,
    connectDisplay: !!connectData,
    connectStartDate: connectData ? connectData.startDate : new Date(),
    featuredDisplay: !!featuredData,
    featuredStartDate: featuredData ? featuredData?.startDate : new Date(),
    featuredEndDate: featuredData ? featuredData?.endDate : null,
  };

  return (
    <>
      <CreateEditEventForm
        title={event.name}
        isLoading={isLoading}
        onSubmit={updateEvent}
        defaultValues={defaultValues}
        secondaryButtonLabel='Back'
        isEdit
      />
      <Button
        onClick={openDeleteModal}
        outline
        className='hover:bg-red-500 hover:opacity-100 hover:text-white hover:border-red-500'>
        Delete Event
      </Button>
    </>
  );
};

export default EditEventClient;
