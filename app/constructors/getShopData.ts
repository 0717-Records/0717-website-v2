import getDisplayShops from '../actions/getDisplayShops';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { Shop } from '../components/admin/Shops/ShopTable';
import getFieldFunc from './getFieldFunc';

export interface ShopData {
  title?: string;
  sub_title?: string;
  shops: Shop[];
}

const getShopData = async (): Promise<ShopData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'shop', category: 'sections' });
  if (!section) return null;
  const { title } = section;

  const getField = getFieldFunc(section);
  const sub_title = getField('shop_sub_title', 'shop>sub_title') as string;

  const shops = await getDisplayShops();

  return {
    title: title || '',
    sub_title: sub_title || '',
    shops,
  };
};

export default getShopData;
