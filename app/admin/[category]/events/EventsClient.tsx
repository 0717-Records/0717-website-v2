'use client';

import { EventListResponse } from '@/app/actions/getEventLists';
import { EventResponse } from '@/app/actions/getEvents';
import EventTable from '@/app/components/admin/Events/EventTable';
import HeaderBar from '@/app/components/admin/HeaderBar';
import Heading from '@/app/components/admin/Typography/Heading';
import MyLink from '@/app/components/admin/ui/MyLink';
import React from 'react';

interface EventsClientProps {
  events: EventResponse[];
  eventLists: EventListResponse[];
}

const EventsClient = ({ events, eventLists }: EventsClientProps) => {
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
      <EventTable events={events} eventLists={eventLists} />
    </>
  );
};

export default EventsClient;
