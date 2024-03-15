import React from 'react';

import ScrollToTop from '@/app/components/admin/ScrollToTop';
import EventsClient from './EventsClient';
import { Event } from '@/app/components/admin/Events/EventTable';
import getEvents from '@/app/actions/getEvents';

const Artists = async () => {
  const events: Event[] = await getEvents();

  return (
    <>
      <ScrollToTop />
      <EventsClient events={events} />
    </>
  );
};

export default Artists;
