import { useModal } from '@/app/hooks/useModal';
import { DisplayArtist } from '@/app/types';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import Paragraph from '../Typography/Paragraph';

interface ArtistModalProps {
  artist: DisplayArtist;
}

const ArtistModal = ({ artist }: ArtistModalProps) => {
  const { closeModal, onClose } = useModal();

  const handleClose = () => {
    closeModal();
    onClose();
  };

  return (
    <>
      <div className='flex flex-col items-center text-center relative z-40 pt-12 pb-8 px-10 w-[35rem] min-h-[40vw] max-w-[80vw] bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 border-none rounded-3xl'>
        <button
          className='absolute right-0 top-0 p-4 self-end	focus:outline-none active: outline-none'
          onClick={handleClose}>
          <IoClose className='w-8 h-8' />
        </button>
        <div className='w-48 h-48 overflow-hidden rounded-full mb-6 relative transition-all duration-200 ease-in-out group-hover:scale-[1.02]'>
          <Image
            fill
            src={artist.image || '/images/placeholder.jpg'}
            alt={artist.name}
            sizes='(min-width: 1024px) 30vw, (min-width: 640px) 35vw, 50vw'
            className='object-cover'
          />
        </div>
        <h1 className='text-2xl font-semibold mb-3'>{artist.name}</h1>
        <Paragraph text={artist.description || ''} multiLine />
      </div>
      <div className='fixed inset-0 z-30 backdrop-blur-sm bg-black/30'></div>
    </>
  );
};

export default ArtistModal;
