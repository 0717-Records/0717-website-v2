'use client';

import { useModal } from '@/app/hooks/useModal';
import React, { useEffect } from 'react';
import ArtistModal from './ArtistModal';
import { useRouter } from 'next/navigation';
import { DisplayArtist } from '@/app/types';

interface ArtistModalControllerProps {
  artist: DisplayArtist;
}

const ArtistModalController = ({ artist }: ArtistModalControllerProps) => {
  const { openCustomModal } = useModal();
  const router = useRouter();
  useEffect(() => {
    openCustomModal({ node: <ArtistModal artist={artist} />, onClose: () => router.push('/') });
  }, []);

  return null;
};

export default ArtistModalController;
