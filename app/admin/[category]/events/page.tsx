import React from 'react';

import ScrollToTop from '@/app/components/admin/ScrollToTop';
import EventsClient from './EventsClient';
import getEvents, { EventResponse } from '@/app/actions/getEvents';
import getEventLists, { EventListResponse } from '@/app/actions/getEventLists';

const Events = async () => {
  const events = await getEvents();
  const eventLists = await getEventLists();

  return (
    <>
      <ScrollToTop />
      <EventsClient events={events} eventLists={eventLists} />
    </>
  );
};

export default Events;
