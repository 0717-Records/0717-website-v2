import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { ClipLoader } from 'react-spinners';

const SlugFeedback = ({
  slugLoading,
  slugIsValid,
}: {
  slugLoading: boolean;
  slugIsValid: boolean;
}) => {
  if (slugLoading) return <ClipLoader color='#85a5fa' />;
  if (slugIsValid) return <FaCheck size={24} className='text-green-500' />;
  return (
    <div className='text-red-500 text-sm flex items-end'>
      <ImCross size={24} className='text-red-500 mr-4 ' />
      <p>Slug is already used! Please adjust.</p>
    </div>
  );
};

export default SlugFeedback;
