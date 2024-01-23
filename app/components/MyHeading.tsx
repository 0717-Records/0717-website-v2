import React from 'react';

type HeadingProps = {
  title: string;
  subTitle?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const Heading: React.FC<HeadingProps> = ({ title, subTitle, type = 'h1' }) => {
  const headingClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  };

  return (
    <div>
      {React.createElement(type, { className: headingClasses[type] }, title)}
      {subTitle && <p className='text-gray-600'>{subTitle}</p>}
    </div>
  );
};

export default Heading;
