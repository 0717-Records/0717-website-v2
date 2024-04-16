import { getSectionByNameCached } from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

export interface ExploreData {
  title?: string;
  sub_title?: string;
  artist_placeholder: {
    message?: string;
  };
}

const getExploreData = async (): Promise<ExploreData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'explore', category: 'sections' });

  if (!section) return null;

  const { title, sub_title } = section;

  const getField = getFieldFunc(section);

  const artist_placeholder = {
    message: getField('artist_placeholder', 'message') as string,
  };

  return {
    title: title || '',
    sub_title: sub_title || '',
    artist_placeholder,
  };
};

export default getExploreData;
