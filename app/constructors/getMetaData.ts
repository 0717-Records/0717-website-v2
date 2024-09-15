import { getSectionByNameCached } from '../actions/getSectionByName';
import getFieldFunc from './getFieldFunc';

const getMetaData = async () => {
  const section = await getSectionByNameCached({
    sectionName: 'meta_data',
    category: 'general',
  });

  if (!section)
    return {
      title: '',
      description: '',
      keywords: '',
      socialImgUrl: '',
    };

  const getField = getFieldFunc(section);

  const title = getField('meta_data', 'meta_data>title') as string;
  const description = getField('meta_data', 'meta_data>description') as string;
  const keywords = getField('meta_data', 'meta_data>keywords') as string;
  const socialImgUrl = getField('meta_data', 'meta_data>social_img') as string;

  return {
    title: title || '',
    description: description || '',
    keywords: keywords || '',
    socialImgUrl: socialImgUrl || '',
  };
};

export default getMetaData;
