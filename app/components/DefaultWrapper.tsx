import { Signika } from 'next/font/google';
import Header from './Header/Header';
import Gradients from './Gradients/Gradients';

const inter = Signika({ subsets: ['latin'] });

const DefaultWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className} default-global`}>
      <Gradients />
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default DefaultWrapper;
