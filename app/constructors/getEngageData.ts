import getDisplayArtists from '../actions/getDisplayArtists';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { DisplayArtist } from '../types';
import getFieldFunc from './getFieldFunc';

export interface EngageData {
  title?: string;
  sub_title?: string;
  artists: DisplayArtist[];
}

const getEngageData = async (): Promise<EngageData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'engage', category: 'sections' });
  const artists = await getDisplayArtists({ listName: 'engage' });

  if (!section) return null;

  const { title } = section;

  const getField = getFieldFunc(section);
  const sub_title = getField('engage_sub_title', 'engage>sub_title') as string;

  return {
    title: title || '',
    sub_title: sub_title || '',
    artists,
  };
};

export default getEngageData;
