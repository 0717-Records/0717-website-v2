import getSectionByName from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

export interface DiscoverData {
  title?: string;
  sub_title?: string;
  message_1: {
    heading?: string;
    description?: string;
  };
  vision_statement: {
    heading?: string;
    description?: string;
  };
  mission_statement: {
    heading?: string;
    description?: string;
  };
}

const getDiscoverData = async (): Promise<DiscoverData | null> => {
  const section = await getSectionByName('discover');

  if (!section) return null;

  const { title, sub_title } = section;

  const getField = getFieldFunc(section);

  const message_1 = {
    heading: getField('message_1', 'heading') as string,
    description: getField('message_1', 'description') as string,
  };

  const vision_statement = {
    heading: getField('vision_statement', 'heading') as string,
    description: getField('vision_statement', 'description') as string,
  };
  const mission_statement = {
    heading: getField('mission_statement', 'heading') as string,
    description: getField('mission_statement', 'description') as string,
  };

  return {
    title: title || '',
    sub_title: sub_title || '',
    message_1,
    vision_statement,
    mission_statement,
  };
};

export default getDiscoverData;
