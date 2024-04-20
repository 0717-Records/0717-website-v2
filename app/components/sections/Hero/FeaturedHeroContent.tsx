'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import Link from 'next/link';
import { siteButtonStyles } from '../../ui/SiteButton';
import { Event } from '../../admin/Events/EventTable';

interface FeaturedHeroContentProps {
  title: string;
  subtitle: string;
  events: Event[];
}

const hasOverlay = true;

const FeaturedHeroContent = ({ title, subtitle, events }: FeaturedHeroContentProps) => {
  return (
    <>
      <div className='absolute inset-0 bg-black opacity-40' />
      <div
        className={`py-6 lg:py-2 relative text-white text-center flex flex-col justify-between items-center ${styles['hero-height']}`}>
        <h1 className='text-3xl sm:text-6xl font-bold'>{title}</h1>
        <div className='mt-8 flex flex-wrap flex-grow gap-4 justify-center sm:w-[85vw] w-[90vw] mx-auto'>
          {events.map((event, index) => (
            <EventContainer key={index} event={event} />
          ))}
        </div>
        <p className='text-2xl sm:text-4xl my-2 sm:mt-0'>{subtitle}</p>
      </div>
    </>
  );
};

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
      {
        <Link
          href={event.imageUrl || '#'}
          target='_blank'
          className='relative w-full rounded-sm overflow-hidden transition-transform hover:scale-[1.02]'>
          <Image
            src={event.imageSrc || '/images/event-main-placeholder.png'}
            alt='Event'
            width={200}
            height={calculateHeight(200, aspectRatio)}
            className='w-[50vh] lg:w-[35vh]'
            priority
          />
          {hasOverlay && (
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center'>
              Overlay Text!
            </div>
          )}
        </Link>
      }
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

export default FeaturedHeroContent;
