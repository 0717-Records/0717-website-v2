import { Roboto } from 'next/font/google';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import getCurrentUser from '@/app/actions/getCurrentUser';
import Login from './Login';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

const AdminWrapper = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className={inter.className}>
      {currentUser ? (
        <>
          <header>
            <Navbar />
          </header>
          <main className='bg-neutral-50 min-h-screen'>
            <div className='flex w-4/5 mx-auto'>
              <SideNavbar />
              {children}
            </div>
          </main>
        </>
      ) : (
        <main>
          <Login />
        </main>
      )}
    </div>
  );
};

export default AdminWrapper;
