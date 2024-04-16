import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/admin/EmptyState';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import GeneralInfoClient from './GeneralInfoClient';

interface IParams {
  unique_name?: string;
  category?: string;
}

const GeneralInfoPage = async ({ params }: { params: IParams }) => {
  const { category } = params;
  const section = await getSectionByName({ sectionName: 'general_info', category });

  if (!section) return <EmptyState />;

  return (
    <>
      <ScrollToTop />
      <GeneralInfoClient {...section} />
    </>
  );
};

export default GeneralInfoPage;
