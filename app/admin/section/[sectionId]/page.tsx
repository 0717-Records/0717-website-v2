import getSectionById from '@/app/actions/getSectionById';
import EditSectionClient from './EditSectionClient';

interface IParams {
  sectionId?: string;
}

const EditSectionPage = async ({ params }: { params: IParams }) => {
  const { sectionId } = params;
  const section = await getSectionById(sectionId);
  if (!section) return null;
  return <EditSectionClient {...section} />;
};

export default EditSectionPage;
