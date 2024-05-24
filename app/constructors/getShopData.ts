import getDisplayShops from '../actions/getDisplayShops';
import { getSectionByNameCached } from '../actions/getSectionByName';
import { Shop } from '../components/admin/Shops/ShopTable';

export interface ShopData {
  title?: string;
  sub_title?: string;
  shops: Shop[];
}

const getShopData = async (): Promise<ShopData | null> => {
  const section = await getSectionByNameCached({ sectionName: 'shop', category: 'sections' });
  if (!section) return null;
  const { title, sub_title } = section;
  const shops = await getDisplayShops();

  return {
    title: title || '',
    sub_title: sub_title || '',
    shops,
  };
};

export default getShopData;
