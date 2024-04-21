import getDisplayArtists from '../actions/getDisplayArtists';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { DisplayArtist } from '../types';

export interface EngageData {
  title?: string;
  sub_title?: string;
  artists: DisplayArtist[];
}

const getEngageData = async (): Promise<EngageData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'engage', category: 'sections' });
  const artists = await getDisplayArtists({ listName: 'engage' });

  if (!section) return null;

  const { title, sub_title } = section;

  return {
    title: title || '',
    sub_title: sub_title || '',
    artists,
  };
};

export default getEngageData;
