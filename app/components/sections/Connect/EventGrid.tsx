'use client';

import React from 'react';
import { Event } from '../../admin/Events/EventTable';
import Image from 'next/image';
import Link from 'next/link';
import Paragraph from '../../Typography/Paragraph';
import CopyEmail from '../../CopyEmail';

interface EventGridProps {
  events: Event[];
  placeHolderText?: string;
  email: string;
}

const EventGrid = ({ events, placeHolderText = '', email }: EventGridProps) => {
  return (
    <div className='flex flex-wrap justify-center w-4/5 gap-8'>
      {events.map((event) => (
        <Link
          key={event.id}
          href={event.imageUrl || '#'}
          className='relative w-[45vh] aspect-[210/297] overflow-hidden hover:shadow-lg hover:scale-[1.03] transition duration-300'>
          <Image
            src={event.imageSrc || '/images/event-img-placeholder.png'}
            alt={event.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            className='object-cover'
            priority
          />
        </Link>
      ))}
      <div className='w-[45vh] aspect-[210/297] bg-primary_yellow flex flex-col justify-center items-center'>
        <Image
          src='/images/aeroplane.webp'
          alt='Tour aeroplane taking off'
          width={253}
          height={181}
          className='w-1/2 mb-6'
        />
        <Paragraph className='text-xl mb-4' text={placeHolderText} multiLine />
        <CopyEmail email={email || ''} />
      </div>
    </div>
  );
};

export default EventGrid;
