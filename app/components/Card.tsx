import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className='bg-gradient-to-br from-yellow-200 to-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-md'>
      {children}
    </div>
  );
};

export default Card;
