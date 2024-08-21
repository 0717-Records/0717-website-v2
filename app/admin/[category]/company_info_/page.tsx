import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/admin/EmptyState';
import ScrollToTop from '@/app/components/admin/ScrollToTop';
import CompanyInfoClient from './CompanyInfoClient';

interface IParams {
  unique_name?: string;
  category?: string;
}

const CompanyInfoPage = async ({ params }: { params: IParams }) => {
  const { category } = params;
  const section = await getSectionByName({ sectionName: 'company_info', category });

  if (!section) return <EmptyState />;

  return (
    <>
      <ScrollToTop />
      <CompanyInfoClient {...section} />
    </>
  );
};

export default CompanyInfoPage;
