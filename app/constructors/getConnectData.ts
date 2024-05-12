import getConnectEvents from '../actions/getConnectEvents';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { Event } from '../components/admin/Events/EventTable';
import getFieldFunc from './getFieldFunc';

export interface ConnectData {
  title?: string;
  sub_title?: string;
  events: Event[];
  event_placeholder: {
    message?: string;
  };
}

const getConnectData = async (): Promise<ConnectData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'connect', category: 'sections' });
  const events = await getConnectEvents();

  if (!section) return null;

  const { title, sub_title } = section;

  const getField = getFieldFunc(section);

  const event_placeholder = {
    message: getField('event_placeholder', 'message') as string,
  };

  return {
    title: title || '',
    sub_title: sub_title || '',
    events,
    event_placeholder,
  };
};

export default getConnectData;
