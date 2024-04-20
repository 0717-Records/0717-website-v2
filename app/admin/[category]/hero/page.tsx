import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/admin/EmptyState';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import HeroClient from './HeroClient';
import getHeroImages from '@/app/actions/getHeroImages';

interface IParams {
  unique_name?: string;
  category?: string;
}

const HeroPage = async ({ params }: { params: IParams }) => {
  const { category } = params;
  const section = await getSectionByName({ sectionName: 'hero', category });
  const images = await getHeroImages();

  if (!section) return <EmptyState />;

  return (
    <>
      <ScrollToTop />
      <HeroClient section={section} images={images} />
    </>
  );
};

export default HeroPage;
