import { DisplayArtist } from '@/app/types';
import React, { ReactNode } from 'react';
import Image from 'next/image';

interface ArtistGridProps {
  artists: DisplayArtist[];
  placeholder?: ReactNode;
}

const ArtistGrid = ({ artists, placeholder = <></> }: ArtistGridProps) => {
  return (
    <div className='flex justify-center flex-wrap gap-x-8 gap-y-10 max-w-[56rem] min-w-[40rem] sm:gap-x-0 sm:gap-y-8 sm:min-w-0'>
      {artists.map((artist) => (
        <div className='flex flex-col justify-start items-center w-1/3 min-w-[10rem] cursor-pointer sm:w-[35vw] sm:max-w-[10rem] sm:flex-grow sm:mx-2 sm:min-w-0'>
          <div className='w-40 h-40 overflow-hidden rounded-full mb-4 relative transition-all duration-200 ease-in-out sm:max-w-32 sm:max-h-32'>
            <Image
              fill
              src={artist.image || '/images/placeholder.jpg'}
              alt={artist.name}
              sizes='(min-width: 1024px) 30vw, (min-width: 640px) 35vw, 50vw'
            />
          </div>

          <h3>{artist.name}</h3>
        </div>
      ))}
      {placeholder}
    </div>
  );
};

export default ArtistGrid;
