import { Metadata } from 'next';
import getMetaData from '../constructors/getMetaData';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetaData();
  return {
    title: `Admin Site - ${data?.title}`,
  };
}

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AdminLayout;
