import { EventResponse } from '@/app/actions/getEvents';
import isActiveByDates from '@/app/libs/isActiveByDates';
import PillDisplay from './PillDisplay';

interface EventConnectPillProps {
  event: EventResponse;
  listName: string;
}

const EventListPill = ({ event, listName }: EventConnectPillProps) => {
  const { startDate, endDate } =
    event.eventListEvent.find((item) => item.eventList.name === listName) ?? {};

  const active = isActiveByDates({ startDate, endDate });

  return (
    <PillDisplay color={active ? 'green' : 'gray'} text={active ? 'Displaying' : 'Not showing'} />
  );
};

export default EventListPill;
