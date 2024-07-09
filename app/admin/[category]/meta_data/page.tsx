import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/admin/EmptyState';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import MetaDataClient from './MetaDataClient';

interface IParams {
  unique_name?: string;
  category?: string;
}

const MetaDataPage = async ({ params }: { params: IParams }) => {
  const { category } = params;
  const section = await getSectionByName({ sectionName: 'meta_data', category });

  if (!section) return <EmptyState />;

  return (
    <>
      <ScrollToTop />
      <MetaDataClient {...section} />
    </>
  );
};

export default MetaDataPage;
