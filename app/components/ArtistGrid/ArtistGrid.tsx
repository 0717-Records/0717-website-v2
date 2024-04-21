import { DisplayArtist } from '@/app/types';
import React, { ReactNode } from 'react';
import Image from 'next/image';

interface ArtistGridProps {
  artists: DisplayArtist[];
  placeholder?: ReactNode;
}

const ArtistGrid = ({ artists, placeholder = <></> }: ArtistGridProps) => {
  return (
    <div className='flex gap-8 max-w-screen-md justify-center flex-wrap gap-y-10 sm:gap-y-8'>
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
      {placeholder}
    </div>
  );
};

export default ArtistGrid;
