import getFeaturedEvents from '../actions/getFeaturedEvents';
import getHeroImages from '../actions/getHeroImages';
import { getSectionByNameCached } from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

const getHeroData = async () => {
  const section = await getSectionByNameCached({ sectionName: 'hero', category: 'sections' });
  const events = await getFeaturedEvents();
  const images = await getHeroImages();

  if (!section) return null;

  const getField = getFieldFunc(section);

  const main_title = getField('hero_content', 'hero main title') as string;
  const sub_title = getField('hero_content', 'hero sub title') as string;

  return {
    main_title: main_title || '',
    sub_title: sub_title || '',
    events,
    images,
  };
};

export default getHeroData;
