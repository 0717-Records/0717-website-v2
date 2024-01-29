import { ReactNode } from 'react';
import MyHeading from '../../typography/MyHeading';

interface EditContainerProps {
  children: ReactNode;
  heading?: string;
}

const EditContainer = ({ children, heading }: EditContainerProps) => {
  return (
    <div className='p-8 mb-8 bg-white rounded-md border border-gray-200'>
      <MyHeading title={heading || ''} type='h3' />
      {children}
    </div>
  );
};

export default EditContainer;
