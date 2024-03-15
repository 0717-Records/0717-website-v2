'use client';

import EventTable, { Event } from '@/app/components/admin/Events/EventTable';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Heading from '@/app/components/admin/Typography/Heading';
import MyLink from '@/app/components/admin/ui/MyLink';
import React from 'react';

interface EventsClientProps {
  events: Event[];
}

const EventsClient = ({ events }: EventsClientProps) => {
  return (
    <>
      <HeaderBar>
        <Heading title='Events' />
        <MyLink
          className='mb-2 bg-blue-500'
          href='/admin/collections/events/new'
          type='button-regular'>
          Add Event
        </MyLink>
      </HeaderBar>
      <EventTable events={events} />
    </>
  );
};

export default EventsClient;
