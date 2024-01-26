import getSectionById from '@/app/actions/getSectionById';
import EditSectionClient from './EditSectionClient';
import ScrollToTop from '@/app/components/scrollToTop';

interface IParams {
  sectionId?: string;
}

const EditSectionPage = async ({ params }: { params: IParams }) => {
  const { sectionId } = params;
  const section = await getSectionById(sectionId);
  if (!section) return null;
  return (
    <>
      <ScrollToTop />
      <EditSectionClient {...section} />
    </>
  );
};

export default EditSectionPage;
