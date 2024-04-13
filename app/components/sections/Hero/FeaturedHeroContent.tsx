import React from 'react';

interface FeaturedHeroContentProps {
  title: string;
  subtitle: string;
}

const FeaturedHeroContent = ({ title, subtitle }: FeaturedHeroContentProps) => {
  return (
    <>
      <div className='absolute inset-0 bg-black opacity-40' />
      <div className='absolute w-full h-full text-white text-center flex flex-col justify-between items-center'>
        <h1 className='text-4xl sm:text-6xl font-bold'>{title}</h1>
        <div className='h-80 w-4/5 bg-red-300'></div>
        <p className='text-2xl sm:text-4xl'>{subtitle}</p>
      </div>
    </>
  );
};

export default FeaturedHeroContent;
