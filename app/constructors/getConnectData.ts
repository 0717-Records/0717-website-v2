import getConnectEvents from '../actions/getConnectEvents';
import getEmail from '../actions/getEmail';
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
  email: string | null;
}

const getConnectData = async (): Promise<ConnectData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'connect', category: 'sections' });
  const events = await getConnectEvents();
  const email = await getEmail();

  if (!section) return null;

  const { title } = section;

  const getField = getFieldFunc(section);

  const sub_title = getField('connect_sub_title', 'connect>sub_title') as string;

  const event_placeholder = {
    message: getField('event_placeholder', 'message') as string,
  };

  return {
    title: title || '',
    sub_title: sub_title || '',
    events,
    event_placeholder,
    email,
  };
};

export default getConnectData;
