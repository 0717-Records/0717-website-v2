import React, { useEffect, useMemo, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';
import LoadingPanel from '../LoadingPanel';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OptionSwitch from '../Inputs/OptionSwitch';
import Heading from '../Typography/Heading';
import { list } from 'postcss';

export interface Event {
  id: string;
  name: string;
  image?: string | null;
  imageUrl?: string | null;
  links: EventLink[];
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

export interface EventList_Event {
  id: string;
  name: string;
  eventId: string;
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
  events: Event[];
  connectList: EventList_Event[];
  featuredList: EventList_Event[];
}

const locationString = (event: Event): string => {
  if (eventInLocations(event, [EventLocations.Connect, EventLocations.Featured]))
    return 'Connect, Featured';
  if (eventInLocations(event, [EventLocations.Connect])) return 'Connect';
  if (eventInLocations(event, [EventLocations.Featured])) return 'Featured';
  return '';
};

const eventInLocations = (event: Event, locations: string[]) =>
  locations.every((location) => event.eventLists.some((list) => list.name === location));

const EventTable = ({ events, connectList, featuredList }: EventTableProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventsToShow, setEventsToShow] = useState(events);
  const [switchVal, setSwitchVal] = useState(EventLocations.All);
  const router = useRouter();

  const showEvents = useMemo(
    () => ({
      all: switchVal === EventLocations.All,
      connect: switchVal === EventLocations.Connect,
      featured: switchVal === EventLocations.Featured,
    }),
    [switchVal]
  );

  const handleRowMove = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'up' | 'down'
  ) => {
    setIsLoading(true);
    e.preventDefault();
    if (showEvents.all) return;
    try {
      // Update order on server
      // await axios.put(`/api/events/${eventsToShow[index].id}/order`, {
      //   location: switchVal,
      //   direction,
      // });
      // router.refresh();

      // Update order on client
      let delta = 0;
      if (direction === 'up' && index > 0) delta = -1;
      if (direction === 'down' && index < eventsToShow.length) delta = 1;
      const updatedList = [...eventsToShow];
      [updatedList[index], updatedList[index + delta]] = [
        updatedList[index + delta],
        updatedList[index],
      ];
      setEventsToShow(updatedList);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  console.log(connectList[0]);

  useEffect(() => {
    const displayEvents =
      switchVal === EventLocations.All
        ? events
        : events
            .filter((event) => eventInLocations(event, [switchVal]))
            .map((event) => ({
              ...event,
              listData: event.eventLists.find((list) => list.name === switchVal),
            }))
            .sort((a, b) => (b.listData?.order || 0) - (a.listData?.order || 0));
    setEventsToShow(displayEvents);
  }, [showEvents]);

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

              {!showEvents.all && (
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
                {!showEvents.all && (
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
