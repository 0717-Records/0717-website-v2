'use client';

import styles from './styles.module.css';
import { Event } from '../../admin/Events/EventTable';
import EventContainer from './EventContainer';

interface FeaturedHeroContentProps {
  title: string;
  subtitle: string;
  events: Event[];
}

const FeaturedHeroContent = ({ title, subtitle, events }: FeaturedHeroContentProps) => {
  return (
    <>
      <div className='absolute inset-0 bg-black opacity-70 z-20' />
      <div
        className={`py-6 lg:py-2 relative text-white text-center flex flex-col justify-between items-center h-full z-30 border border-blue-500`}>
        <h1 className='text-3xl sm:text-6xl font-bold'>{title}</h1>
        <div className='mt-8 flex flex-wrap flex-grow gap-4 justify-center sm:w-[85vw] w-[90vw] mx-auto'>
          {events.map((event, index) => {
            if (index > 0) return <></>;
            return <EventContainer key={index} event={event} />;
          })}
        </div>
        <p className='text-2xl sm:text-4xl my-2 sm:mt-0'>{subtitle}</p>
      </div>
    </>
  );
};

export default FeaturedHeroContent;
