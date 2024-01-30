import EditSectionClient from './EditSectionClient';
import getSectionByName from '@/app/actions/getSectionByName';
import ScrollToTop from '@/app/components/ScrollToTop';

interface IParams {
  unique_name?: string;
  category?: string;
}

const EditSectionPage = async ({ params }: { params: IParams }) => {
  const { category, unique_name } = params;
  if (!unique_name || !category) return null;
  const section = await getSectionByName({ sectionName: unique_name, category });
  if (!section) return null;
  return (
    <>
      <ScrollToTop />
      <EditSectionClient {...section} />
    </>
  );
};

export default EditSectionPage;
