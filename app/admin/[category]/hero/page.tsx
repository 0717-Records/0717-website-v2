import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/admin/EmptyState';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import HeroClient from './HeroClient';

interface IParams {
  unique_name?: string;
  category?: string;
}

const HeroPage = async ({ params }: { params: IParams }) => {
  const { category } = params;
  const section = await getSectionByName({ sectionName: 'hero', category });

  if (!section) return <EmptyState />;

  return (
    <>
      <ScrollToTop />
      <HeroClient {...section} />
    </>
  );
};

export default HeroPage;
