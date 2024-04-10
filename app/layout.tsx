import type { Metadata } from 'next';
import './globals.css';
import AdminWrapper from './components/admin/AdminWrapper';
import DefaultWrapper from './components/DefaultWrapper';
import getPathname from './actions/getPathname';
import ToasterProvider from './providers/ToasterProvider';
import Modal from './components/Modal/Modal';

export const metadata: Metadata = {
  title: 'Nextjs CMS Practice',
  description: 'Practicing my Nextjs CMS setup',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = getPathname();

  // const protectedRoutes = ['/admin'];
  // const showLogin = !currentUser && protectedRoutes.some((route) => pathname?.includes(route));

  const isAdminSection = pathname?.includes('/admin');

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className='text-black'>
        <ToasterProvider />
        <Modal />
        {isAdminSection ? (
          <AdminWrapper>{children}</AdminWrapper>
        ) : (
          <DefaultWrapper>{children}</DefaultWrapper>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
