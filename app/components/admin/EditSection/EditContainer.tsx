import { ReactNode } from 'react';
import MyHeading from '../Typography/Heading';
import PillDisplay from '../PillDisplay';

interface EditContainerProps {
  children: ReactNode;
  heading?: string | null;
  pillDisplay?: {
    color: 'green' | 'gray';
    text: string;
  };
}

const EditContainer = ({ children, heading, pillDisplay }: EditContainerProps) => {
  return (
    <div className='p-8 mb-8 bg-white rounded-md border border-gray-200'>
      <div className='flex items-center gap-3'>
        {heading && <MyHeading title={heading} type='h3' />}
        {pillDisplay && (
          <PillDisplay className='mb-4' color={pillDisplay.color} text={pillDisplay.text} />
        )}
      </div>

      {children}
    </div>
  );
};

export default EditContainer;
