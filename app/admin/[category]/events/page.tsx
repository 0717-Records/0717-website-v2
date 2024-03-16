import React from 'react';

import ScrollToTop from '@/app/components/admin/ScrollToTop';
import EventsClient from './EventsClient';
import { Event, EventList_Event } from '@/app/components/admin/Events/EventTable';
import getEvents from '@/app/actions/getEvents';
import getEventListByName from '@/app/actions/getEventListByName';

const Artists = async () => {
  const events: Event[] = await getEvents();
  const connectList: EventList_Event[] = await getEventListByName('connect');
  const featuredList: EventList_Event[] = await getEventListByName('featured');

  return (
    <>
      <ScrollToTop />
      <EventsClient events={events} connectList={connectList} featuredList={featuredList} />
    </>
  );
};

export default Artists;
