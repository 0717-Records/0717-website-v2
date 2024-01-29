import { Roboto } from 'next/font/google';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar/SideNavbar';
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
            <div className='flex w-9/12 mx-auto pt-48 border border-green-500'>
              <SideNavbar />
              <div className='border border-red-500'>{children}</div>
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
