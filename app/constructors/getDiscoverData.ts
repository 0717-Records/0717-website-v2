import getEmail from '../actions/getEmail';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { Link } from '../types';
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
  links: Link[];
  email: string | null;
}

const getDiscoverData = async (): Promise<DiscoverData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'discover', category: 'sections' });
  const email = await getEmail();

  if (!section) return null;

  const { title } = section;

  const getField = getFieldFunc(section);

  const sub_title = getField('discover_sub_title', 'discover>sub_title') as string;

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

  const links = getField('company_links', 'company_links') as Link[];

  return {
    title: title || '',
    sub_title: sub_title || '',
    message_1,
    vision_statement,
    mission_statement,
    links,
    email,
  };
};

export default getDiscoverData;
