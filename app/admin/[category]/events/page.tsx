import React from 'react';

import ScrollToTop from '@/app/components/admin/ScrollToTop';
import EventsClient from './EventsClient';
import getEvents, { EventResponse } from '@/app/actions/getEvents';
import getEventLists, { EventListResponse } from '@/app/actions/getEventLists';

const Artists = async () => {
  const events: EventResponse[] = await getEvents();
  const eventLists: EventListResponse[] = await getEventLists();

  return (
    <>
      <ScrollToTop />
      <EventsClient events={events} eventLists={eventLists} />
    </>
  );
};

export default Artists;
