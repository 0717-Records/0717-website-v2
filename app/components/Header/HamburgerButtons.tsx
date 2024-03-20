import React from 'react';

export const HamburgerButton = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 12h14' />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 6h14' />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 18h14' />
    </svg>
  );
};

export const HamburgerCross = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
    </svg>
  );
};
