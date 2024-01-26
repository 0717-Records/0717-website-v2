import EditSectionClient from './EditSectionClient';
import getSectionByName from '@/app/actions/getSectionByName';
import ScrollToTop from '@/app/components/ScrollToTop';

interface IParams {
  unique_name?: string;
}

const EditSectionPage = async ({ params }: { params: IParams }) => {
  const { unique_name } = params;
  if (!unique_name) return null;
  const section = await getSectionByName(unique_name);
  if (!section) return null;
  return (
    <>
      <ScrollToTop />
      <EditSectionClient {...section} />
    </>
  );
};

export default EditSectionPage;
