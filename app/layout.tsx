import type { Metadata } from 'next';
import './globals.css';
import AdminWrapper from './components/admin/AdminWrapper';
import DefaultWrapper from './components/DefaultWrapper';
import getPathname from './actions/getPathname';
import ToasterProvider from './providers/ToasterProvider';

export const metadata: Metadata = {
  title: '07:17 Records',
  description: 'Our Vision: To inspire improvement in the relationship between Art and Commerce.',
  keywords:
    '07:17 Records 0717 Seven Seventeen Discover Explore Engage Connect Music Poetry Spoken Word Film Dance Visual Arts Literature Artist Project On Tour Art Commerce Creating Collaborations Creative Enterprise Support Sustainable Economic Growth Creative Development Artists Creators Global Creative Industries',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = getPathname();

  // const protectedRoutes = ['/admin'];
  // const showLogin = !currentUser && protectedRoutes.some((route) => pathname?.includes(route));

  const isAdminSection = pathname?.includes('/admin');

  return (
    <html lang='en'>
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
