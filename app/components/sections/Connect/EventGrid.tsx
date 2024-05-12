'use client';

import React from 'react';
import { Event } from '../../admin/Events/EventTable';

const EventGrid = ({ events }: { events: Event[] }) => {
  return (
    <div className='flex flex-col'>
      {events.map((event) => (
        <h1 key={event.id}>{event.name}</h1>
      ))}
    </div>
  );
};

export default EventGrid;
