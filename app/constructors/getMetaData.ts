import { getSectionByNameCached } from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

const getMetaData = async () => {
  const section = await getSectionByNameCached({
    sectionName: 'meta_data',
    category: 'general',
  });

  if (!section) return null;

  const getField = getFieldFunc(section);

  const title = getField('meta_data', 'title') as string;
  const description = getField('meta_data', 'description') as string;
  const keywords = getField('meta_data', 'keywords') as string;

  return {
    title: title || '',
    description: description || '',
    keywords: keywords || '',
  };
};

export default getMetaData;
