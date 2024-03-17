import React, { useEffect, useMemo, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';
import LoadingPanel from '../LoadingPanel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OptionSwitch from '../Inputs/OptionSwitch';
import Heading from '../Typography/Heading';
import { EventResponse } from '@/app/actions/getEvents';
import { EventListResponse } from '@/app/actions/getEventLists';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface Event {
  id: string;
  name: string;
  image?: string | null;
  imageUrl?: string | null;
  shadowDisplay: boolean;
  shadowStartDate: Date;
  shadowEndDate?: Date | null;
  shadowMessage?: string | null;
  createdAt: Date;
}

export interface EventLink {
  id: string;
  name: string;
  url: string;
  order: number;
}

export interface EventList {
  id: string;
  name: string;
}

export interface EventList_Event {
  id: string;
  eventId: string;
  eventListId: string;
  startDate: Date;
  endDate: Date | null;
  order: number;
}

export enum EventLocations {
  All = 'all',
  Connect = 'connect',
  Featured = 'featured',
}

interface EventTableProps {
  events: EventResponse[];
  eventLists: EventListResponse[];
}

const locationString = (event: EventResponse): string => {
  if (eventInLocations(event, [EventLocations.Connect, EventLocations.Featured]))
    return 'Connect, Featured';
  if (eventInLocations(event, [EventLocations.Connect])) return 'Connect';
  if (eventInLocations(event, [EventLocations.Featured])) return 'Featured';
  return '';
};

const eventInLocations = (event: EventResponse, locations: string[]) =>
  locations.every((location) => event.eventListEvent.some((e) => e.eventList.name === location));

const EventTable = ({ events, eventLists: eventListsDefault }: EventTableProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventsToShow, setEventsToShow] = useState(events);
  const [eventLists, setEventLists] = useState(eventListsDefault);
  const [switchVal, setSwitchVal] = useState(EventLocations.All);
  const router = useRouter();

  const handleRowMove = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'up' | 'down'
  ) => {
    setIsLoading(true);
    e.preventDefault();
    if (switchVal === EventLocations.All) return;
    try {
      if (direction !== 'up' && direction !== 'down') throw new Error('Invalid direction!');
      if (direction === 'up' && index === 0)
        throw new Error('Attempting to move event up but event already at top!');
      if (direction === 'down' && index === eventsToShow.length - 1)
        throw new Error('Attempting to move event down but event already at bottom!');

      // Update order on server
      await axios.put(`/api/events/${eventsToShow[index].id}/order`, {
        location: switchVal,
        direction,
      });
      router.refresh();

      const delta = direction === 'up' ? -1 : 1;

      const currentListIndex = eventLists.findIndex((list) => list.name === switchVal);
      if (currentListIndex === -1) throw new Error(`Cannot find list: ${switchVal}`);

      // Directly modify the eventLists array for efficiency and clarity
      const currentList = eventLists[currentListIndex];
      const updatedEventListEvents = [...currentList.eventListEvent];

      // Swap elements
      [updatedEventListEvents[index], updatedEventListEvents[index + delta]] = [
        updatedEventListEvents[index + delta],
        updatedEventListEvents[index],
      ];

      // Update the event list with the new events order
      eventLists[currentListIndex].eventListEvent = updatedEventListEvents;

      setEventLists([...eventLists]); // Update the state to trigger re-render
    } catch (error: any) {
      console.error(error);
      toast.error('Error updating event order!');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Show all events
    if (switchVal === EventLocations.All) {
      setEventsToShow(events);
      return;
    }

    // Show events for selected list
    const listToShow = eventLists.find((list) => list.name === switchVal);
    if (!listToShow) throw new Error(`Cannot find list: ${switchVal}`);
    const displayedEventIds = listToShow.eventListEvent.map((item) => item.eventId) || [];
    const displayedEvents = displayedEventIds
      .map((id) => events.find((event) => event.id === id))
      .filter((event) => event !== undefined) as EventResponse[];
    setEventsToShow(displayedEvents);
  }, [switchVal, eventLists]);

  return (
    <>
      {isLoading && <LoadingPanel />}
      <OptionSwitch
        value={switchVal}
        options={[EventLocations.All, EventLocations.Connect, EventLocations.Featured]}
        labels={['Show All', 'Connect', 'Featured']}
        onChange={(selection) => setSwitchVal(selection)}
      />
      {!eventsToShow.length ? (
        <div className='mt-4'>
          <Heading type='h2' title='No events to show' subTitle='Add an event to get started.' />
        </div>
      ) : (
        <table className='min-w-full divide-y divide-gray-200 mt-4'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Location
              </th>

              {switchVal !== EventLocations.All && (
                <>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Display
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Order
                  </th>
                </>
              )}
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {eventsToShow.map((event, index) => (
              <tr key={index} className='transition-transform duration-300 ease-in-out'>
                <td className='px-6 py-4 whitespace-normal'>
                  <Link
                    href={`/admin/collections/events/${event.id}`}
                    className='flex items-center hover:underline'>
                    <div className='relative mr-8 overflow-hidden'>
                      <Image
                        className='object-cover'
                        src={event.image || '/images/event-img-placeholder.png'}
                        alt='Event image'
                        width={40}
                        height={56}
                      />
                    </div>

                    <span className='pr-4'>{event.name}</span>
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{locationString(event)}</td>
                {switchVal !== EventLocations.All && (
                  <>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        [ADD LOGIC FOR DISPLAY]
                      </span>
                    </td>
                    <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                      <UpDownArrows
                        index={index}
                        onUpClick={(e) => handleRowMove(index, e, 'up')}
                        onDownClick={(e) => handleRowMove(index, e, 'down')}
                        numRows={eventsToShow.length}
                      />
                    </td>
                  </>
                )}

                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={`/admin/collections/events/${event.id}`}>
                    <FaPencilAlt className='hover:opacity-60' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EventTable;
