import './globals.css';
import AdminWrapper from './components/admin/AdminWrapper';
import DefaultWrapper from './components/DefaultWrapper';
import getPathname from './actions/getPathname';
import ToasterProvider from './providers/ToasterProvider';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = getPathname();

  // const protectedRoutes = ['/admin'];
  // const showLogin = !currentUser && protectedRoutes.some((route) => pathname?.includes(route));
  //

  const isAdminSection = pathname?.includes('/admin');

  return (
    <html className='scroll-smooth' lang='en' style={{ scrollBehavior: 'smooth' }}>
      <body suppressHydrationWarning={true} className='text-black'>
        <ToasterProvider />
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
