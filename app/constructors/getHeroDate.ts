import { getSectionByNameCached } from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

const getHeroData = async () => {
  const section = await getSectionByNameCached({ sectionName: 'hero', category: 'sections' });

  if (!section) return null;

  const getField = getFieldFunc(section);

  const main_title = getField('hero_content', 'hero main title') as string;
  const sub_title = getField('hero_content', 'hero sub title') as string;

  return {
    main_title: main_title || '',
    sub_title: sub_title || '',
  };
};

export default getHeroData;
