import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { ClipLoader } from 'react-spinners';

export enum SlugStates {
  IDLE,
  LOADING,
  VALID,
  INVALID,
  ERROR,
}

const SlugFeedback = ({ slugState }: { slugState: SlugStates }) => {
  let result;
  if (slugState === SlugStates.IDLE) return null;
  if (slugState === SlugStates.LOADING) result = <ClipLoader color='#85a5fa' />;
  if (slugState === SlugStates.VALID) result = <FaCheck size={24} className='text-green-500' />;
  if (slugState === SlugStates.INVALID)
    result = (
      <div className='text-red-500 text-sm flex items-end'>
        <ImCross size={24} className='text-red-500 mr-4 ' />
        <p>Slug is already used! Please adjust.</p>
      </div>
    );
  if (slugState === SlugStates.ERROR)
    result = (
      <div className='text-red-500 text-sm flex items-end'>
        <ImCross size={24} className='text-red-500 mr-4 ' />
        <p>Error checking slug! Please try again later.</p>
      </div>
    );
  return <div className='ml-4 mb-8'>{result}</div>;
};

export default SlugFeedback;
