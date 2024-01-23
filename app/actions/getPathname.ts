import { headers } from 'next/headers';

const getPathname = () => {
  const headerList = headers();
  return headerList.get('x-pathname');
};

export default getPathname;
