import getSectionByName from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

export interface ConnectData {
  title?: string;
  sub_title?: string;
  event_placeholder: {
    message?: string;
  };
}

const getConnectData = async (): Promise<ConnectData | null> => {
  const section = await getSectionByName({ sectionName: 'connect', category: 'sections' });

  if (!section) return null;

  const { title, sub_title } = section;

  const getField = getFieldFunc(section);

  const event_placeholder = {
    message: getField('event_placeholder', 'message') as string,
  };

  return {
    title: title || '',
    sub_title: sub_title || '',
    event_placeholder,
  };
};

export default getConnectData;
