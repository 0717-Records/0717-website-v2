import React from 'react';
import { Event } from './admin/Events/EventTable';
import isActiveByDates from '../libs/isActiveByDates';
import Paragraph from './Typography/Paragraph';

const EventOverlay = ({ event }: { event: Event }) => {
  const displayOverlay =
    event.shadowDisplay &&
    isActiveByDates({ startDate: event.shadowStartDate, endDate: event.shadowEndDate });

  if (!displayOverlay) return null;

  return (
    <Paragraph
      className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center'
      text={event.shadowMessage || ''}
      multiLine
    />
  );
};

export default EventOverlay;
