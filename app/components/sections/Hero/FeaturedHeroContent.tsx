'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MyLink from '../../admin/ui/MyLink';
import styles from './styles.module.css';

interface Event {
  imageSrc: string;
  imageUrl: string;
  links: { url: string; label: string }[];
}

interface FeaturedHeroContentProps {
  title: string;
  subtitle: string;
  events: Event[];
}

const FeaturedHeroContent = ({ title, subtitle, events }: FeaturedHeroContentProps) => {
  return (
    <>
      <div className='absolute inset-0 bg-black opacity-40' />
      <div
        className={`py-6 lg:py-2 relative text-white text-center flex flex-col justify-between items-center ${styles['hero-height']}`}>
        <h1 className='text-3xl sm:text-6xl font-bold'>{title}</h1>
        <div className='my-4 flex flex-wrap flex-grow gap-4 justify-center sm:w-[85vw] w-[90vw] mx-auto'>
          {events.map((event, index) => (
            <EventContainer key={index} event={event} />
          ))}
        </div>
        <p className='text-2xl sm:text-4xl'>{subtitle}</p>
      </div>
    </>
  );
};

const EventContainer = ({ event }: { event: Event }) => {
  const [aspectRatio, setAspectRatio] = useState<string>('210:297'); // Default aspect ratio

  useEffect(() => {
    if (event.imageSrc || event.imageUrl) {
      const tempImg = document.createElement('img');
      tempImg.src = event.imageSrc || event.imageUrl;
      tempImg.onload = () => {
        const aspectWidth = tempImg.width;
        const aspectHeight = tempImg.height;
        const ratio = `${aspectWidth}:${aspectHeight}`;
        setAspectRatio(ratio);
      };
    }
  }, [event.imageSrc, event.imageUrl]);

  return (
    <div className='flex flex-col justify-center'>
      {(event.imageSrc || event.imageUrl) && (
        <div className='relative w-full'>
          <Image
            src={event.imageSrc || event.imageUrl}
            alt='Event'
            width={200}
            height={calculateHeight(200, aspectRatio)}
            className='w-[50vh] lg:w-[40vh]'
          />
        </div>
      )}
      <div className='flex flex-col items-center mt-2'>
        {event.links.map((link, idx) => (
          <MyLink key={idx} href={link.url} className='text-lg'>
            {link.label}
          </MyLink>
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

export default FeaturedHeroContent;
