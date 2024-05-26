import getShopData from '@/app/constructors/getShopData';
import SectionWrapper from '../SectionWrapper';
import ShopGrid from '../ShopGrid';

const Shop = async () => {
  const data = await getShopData();
  if (!data) return null;
  const { title, sub_title, shops } = data;
  if (!shops) return null;

  return (
    <SectionWrapper id='shop' title={title} subTitle={sub_title}>
      <ShopGrid shops={shops} />
    </SectionWrapper>
  );
};

export default Shop;
