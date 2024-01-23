import { Roboto } from 'next/font/google';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import Heading from '../Heading';
import getCurrentUser from '@/app/actions/getCurrentUser';
import Login from '../Login';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

const AdminWrapper = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  const mainContent = currentUser ? (
    <>
      <Heading>07:17 Content Management System</Heading>
      <div className='flex'>
        <SideNavbar />
        {children}
      </div>
    </>
  ) : (
    <Login />
  );

  return (
    <div className={inter.className}>
      <header>
        <Navbar isLoggedIn={!!currentUser} />
      </header>
      <main>{mainContent}</main>
    </div>
  );
};

export default AdminWrapper;
