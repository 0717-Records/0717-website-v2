import React, { useEffect, useState } from 'react';
import { Event } from '../../admin/Events/EventTable';
import Link from 'next/link';
import Image from 'next/image';
import { siteButtonStyles } from '../../ui/SiteButton';
import EventOverlay from '../../EventOverlay';

const EventContainer = ({ event }: { event: Event }) => {
  const [aspectRatio, setAspectRatio] = useState<string>('210:297'); // Default aspect ratio

  useEffect(() => {
    if (event.imageSrc) {
      const tempImg = document.createElement('img');
      tempImg.src = event.imageSrc;
      tempImg.onload = () => {
        const aspectWidth = tempImg.width;
        const aspectHeight = tempImg.height;
        const ratio = `${aspectWidth}:${aspectHeight}`;
        setAspectRatio(ratio);
      };
    }
  }, [event.imageSrc, event.imageUrl]);

  return (
    <div className='flex flex-col mb-4 justify-center'>
      <Link
        href={event.imageUrl || '#'}
        target='_blank'
        className='relative w-full rounded-sm overflow-hidden transition-transform hover:scale-[1.02]'>
        <Image
          src={event.imageSrc || '/images/event-img-placeholder.png'}
          alt='Event'
          width={200}
          height={calculateHeight(200, aspectRatio)}
          className='w-[60vw] lg:w-[15vw]'
          priority
        />
        <EventOverlay event={event} />
      </Link>
      <div className='flex flex-col gap-2 items-center mt-4'>
        {event.links.map((link: { url: string; label: string }, idx: number) => (
          <Link
            key={idx}
            href={link.url}
            target='_blank'
            className={`${siteButtonStyles} bg-primary_yellow_dim bg-opacity-50`}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Function to calculate height based on aspect ratio
const calculateHeight = (width: number, aspectRatio: string) => {
  const [aspectWidth, aspectHeight] = aspectRatio.split(':').map(Number);
  return (width / aspectWidth) * aspectHeight;
};

export default EventContainer;
