'use client';

import { DisplayArtist } from '@/app/types';
import React from 'react';
import Image from 'next/image';
import CopyEmail from '../CopyEmail';
import { useModal } from '@/app/hooks/useModal';
import ArtistModal from './ArtistModal';

interface ArtistGridProps {
  artists: DisplayArtist[];
  placeholder?: boolean;
  placeHolderText?: string;
  email?: string;
  pageTitle?: string;
}

const setBrowserOnOpen = (artistName: string, slug: string, pageTitle: string) => {
  window.history.pushState(null, '', `/${slug}`);
  document.title = `${artistName} - ${pageTitle}`;
};
const setBrowserOnClose = (pageTitle: string) => {
  window.history.pushState(null, '', '/');
  document.title = pageTitle;
};

const ArtistGrid = ({
  artists,
  placeholder = false,
  placeHolderText,
  email,
  pageTitle = '',
}: ArtistGridProps) => {
  const { openCustomModal } = useModal();

  const openArtistModal = ({ artist }: { artist: DisplayArtist }) => {
    setBrowserOnOpen(artist.name, artist.slug, pageTitle);
    openCustomModal({
      node: <ArtistModal artist={artist} />,
      onClose: () => setBrowserOnClose(pageTitle),
    });
  };

  return (
    <div className='flex gap-9 md:gap-12 max-w-screen-md justify-center flex-wrap px-3'>
      {artists.map((artist) => (
        <div
          key={artist.id}
          onClick={() => openArtistModal({ artist })}
          className='flex flex-col justify-start items-center cursor-pointer sm:w-[35vw] sm:max-w-[10rem] sm:flex-grow sm:mx-2 group max-w-32'>
          <div className='w-32 h-32 overflow-hidden rounded-full mb-4 relative transition-all duration-200 ease-in-out sm:w-40 sm:h-40 group-hover:scale-[1.02]'>
            <Image
              fill
              src={artist.image || '/images/placeholder.jpg'}
              alt={artist.name}
              sizes='(min-width: 1024px) 30vw, (min-width: 640px) 35vw, 50vw'
              className='object-cover'
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
              className='object-cover'
            />
          </div>
          <h3 className='text-xl w-28'>{placeHolderText}</h3>
          <CopyEmail email={email || ''} />
        </div>
      )}
    </div>
  );
};

export default ArtistGrid;
