import { getSectionByNameCached } from '../actions/getSectionByName';

export interface EngageData {
  title?: string;
  sub_title?: string;
}

const getEngageData = async (): Promise<EngageData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'engage', category: 'sections' });

  if (!section) return null;

  const { title, sub_title } = section;

  return {
    title: title || '',
    sub_title: sub_title || '',
  };
};

export default getEngageData;
