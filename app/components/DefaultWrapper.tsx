import { Signika } from 'next/font/google';

const inter = Signika({ subsets: ['latin'] });

const DefaultWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={`${inter.className} default-global`}>{children}</div>;
};

export default DefaultWrapper;
