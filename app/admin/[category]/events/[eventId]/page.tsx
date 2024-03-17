import React from 'react';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import EmptyState from '@/app/components/admin/EmptyState';
import getArtistById from '@/app/actions/getArtistById';
import getEventById from '@/app/actions/getEventById';

interface IParams {
  eventId?: string;
}

const EditEvent = async ({ params }: { params: IParams }) => {
  const { eventId } = params;
  if (!eventId) return <EmptyState />;
  const event = await getEventById(eventId);

  if (!event)
    return (
      <EmptyState title='Unknown Event!' subtitle={`Unable to find event with ID: "${eventId}"`} />
    );
  return (
    <>
      <ScrollToTop />
      {/* <EditEventClient event={event} /> */}
    </>
  );
};

export default EditEvent;
