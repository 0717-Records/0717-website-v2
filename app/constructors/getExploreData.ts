import getDisplayArtists from '../actions/getDisplayArtists';
import getEmail from '../actions/getEmail';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { DisplayArtist } from '../types';
import getFieldFunc from './getFieldFunc';

export interface ExploreData {
  title?: string;
  sub_title?: string;
  artist_placeholder: {
    message?: string;
  };
  artists: DisplayArtist[];
  email: string | null;
}

const getExploreData = async (): Promise<ExploreData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'explore', category: 'sections' });
  const artists = await getDisplayArtists({ listName: 'explore' });
  const email = await getEmail();

  if (!section) return null;

  const { title } = section;

  const getField = getFieldFunc(section);

  const sub_title = getField('explore_sub_title', 'explore>sub_title') as string;

  const artist_placeholder = {
    message: getField('artist_placeholder', 'message') as string,
  };

  return {
    title: title || '',
    sub_title: sub_title || '',
    artist_placeholder,
    artists,
    email,
  };
};

export default getExploreData;
