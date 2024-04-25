import { useModal } from '@/app/hooks/useModal';
import { DisplayArtist } from '@/app/types';
import React from 'react';
import { IoClose } from 'react-icons/io5';

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
      <div className='relative z-40 w-[35rem] min-h-[40vw] max-w-[80vw] bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 border-none rounded-3xl'>
        <button className='relative z-40 top-0' onClick={handleClose}>
          <IoClose />
        </button>
        <h1>{artist.name}</h1>
        <h1>{artist.description}</h1>
      </div>
      <div className='fixed inset-0 z-30 backdrop-blur-sm bg-black/30'></div>
    </>
  );
};

export default ArtistModal;
