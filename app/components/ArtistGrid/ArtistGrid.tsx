import { DisplayArtist } from '@/app/types';
import React from 'react';
import Image from 'next/image';
import CopyEmail from '../CopyEmail';

interface ArtistGridProps {
  artists: DisplayArtist[];
  placeholder?: boolean;
  placeHolderText?: string;
  email?: string;
}

const ArtistGrid = ({ artists, placeholder = false, placeHolderText, email }: ArtistGridProps) => {
  return (
    <div className='flex gap-6 md:gap-12 max-w-screen-md justify-center flex-wrap px-4'>
      {artists.map((artist) => (
        <div className='flex flex-col justify-start items-center cursor-pointer sm:w-[35vw] sm:max-w-[10rem] sm:flex-grow sm:mx-2 group'>
          <div className='w-32 h-32 overflow-hidden rounded-full mb-4 relative transition-all duration-200 ease-in-out sm:w-40 sm:h-40 group-hover:scale-[1.02]'>
            <Image
              fill
              src={artist.image || '/images/placeholder.jpg'}
              alt={artist.name}
              sizes='(min-width: 1024px) 30vw, (min-width: 640px) 35vw, 50vw'
            />
          </div>
          <h3 className='text-xl group-hover:font-semibold'>{artist.name}</h3>
        </div>
      ))}
      {placeholder && (
        <div className='flex flex-col justify-start items-center sm:w-[35vw] sm:max-w-[10rem] sm:flex-grow sm:mx-2'>
          <div className='w-32 h-32 overflow-hidden rounded-full mb-4 relative transition-all duration-200 ease-in-out sm:w-40 sm:h-40 bg-primary_yellow'>
            <Image
              fill
              src='/images/question-mark.webp'
              alt='Collaboration artist placeholder image'
              sizes='(min-width: 1024px) 30vw, (min-width: 640px) 35vw, 50vw'
            />
          </div>
          <h3 className='text-xl'>{placeHolderText}</h3>
          <CopyEmail email={email || ''} />
        </div>
      )}
    </div>
  );
};

export default ArtistGrid;
