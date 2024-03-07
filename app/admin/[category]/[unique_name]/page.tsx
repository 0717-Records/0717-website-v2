import EditSectionClient from './EditSectionClient';
import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/EmptyState';
import ScrollToTop from '@/app/components/ScrollToTop';

interface IParams {
  unique_name?: string;
  category?: string;
}

const EditSectionPage = async ({ params }: { params: IParams }) => {
  const { category, unique_name } = params;
  if (!unique_name || !category) return <EmptyState />;
  const section = await getSectionByName({ sectionName: unique_name, category });

  if (!section) return <EmptyState />;

  return (
    <>
      <ScrollToTop />
      <EditSectionClient {...section} />
    </>
  );
};

export default EditSectionPage;
