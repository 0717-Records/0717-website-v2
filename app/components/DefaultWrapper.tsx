import { Signika } from 'next/font/google';
import Header from './Header/Header';
import Gradients from './Gradients/Gradients';
import Modal from './Modal/Modal';
import getShopCount from '../actions/getShopCount';
import Footer from './Footer';

const inter = Signika({ subsets: ['latin'] });

const DefaultWrapper = async ({ children }: { children: React.ReactNode }) => {
  const numShops = await getShopCount();
  return (
    <div className={`${inter.className} default-global`}>
      <Modal />
      <Gradients />
      <Header numShops={numShops} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultWrapper;
