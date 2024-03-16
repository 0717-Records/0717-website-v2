'use client';

import EventTable, { Event, EventList_Event } from '@/app/components/admin/Events/EventTable';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Heading from '@/app/components/admin/Typography/Heading';
import MyLink from '@/app/components/admin/ui/MyLink';
import React from 'react';

interface EventsClientProps {
  events: Event[];
  connectList: EventList_Event[];
  featuredList: EventList_Event[];
}

const EventsClient = ({ events, connectList, featuredList }: EventsClientProps) => {
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
      <EventTable events={events} connectList={connectList} featuredList={featuredList} />
    </>
  );
};

export default EventsClient;
