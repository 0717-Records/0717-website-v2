import Image from 'next/image';
import styles from './styles.module.css';
import FeaturedHeroContent from './FeaturedHeroContent';
import getHeroData from '@/app/constructors/getHeroDate';

const Hero = async () => {
  const data = await getHeroData();
  if (!data) return null;
  const { main_title, sub_title } = data;

  const imageUrl = '/images/star-control-hero.jpg';
  const events = [
    {
      imageSrc: '/images/test-events/event-1.jpg',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'But tickets',
        },
        // {
        //   url: '#',
        //   label: 'Listen',
        // },
        // {
        //   url: '#',
        //   label: 'Support now!',
        // },
        // {
        //   url: '#',
        //   label: 'But tickets',
        // },
        // {
        //   url: '#',
        //   label: 'Listen',
        // },
        // {
        //   url: '#',
        //   label: 'Support now!',
        // },
      ],
    },
    {
      imageSrc: '/images/test-events/event-1.jpg',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'But tickets',
        },
      ],
    },
    {
      imageSrc: '/images/test-events/event-2.png',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'Link 1',
        },
      ],
    },
    {
      imageSrc: '/images/test-events/event-3.jpg',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'Link 1',
        },
        {
          url: '#',
          label: 'Link 2',
        },
      ],
    },
    {
      imageSrc: '/images/test-events/event-1.jpg',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'But tickets',
        },
        {
          url: '#',
          label: 'Listen',
        },
        {
          url: '#',
          label: 'Support now!',
        },
      ],
    },
    {
      imageSrc: '/images/test-events/event-2.png',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'Link 1',
        },
      ],
    },
    {
      imageSrc: '/images/test-events/event-3.jpg',
      imageUrl: '#',
      links: [
        {
          url: '#',
          label: 'Link 1',
        },
        {
          url: '#',
          label: 'Link 2',
        },
      ],
    },
  ];

  const hasFeaturedContent = true;

  return (
    <section className={`relative ${styles['hero-height']}`}>
      <Image
        src={imageUrl}
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        alt='Star Control playing at Wine Cellar'
        className='select-none pointer-events-none'
        priority
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent opacity-99' />
      {hasFeaturedContent ? (
        <FeaturedHeroContent title={main_title} subtitle={sub_title} events={events} />
      ) : (
        <div className='absolute bottom-20 md:bottom-20 right-1/2 lg:right-44 text-center lg:text-right text-white space-y-4 translate-x-1/2 lg:translate-x-0 w-full p-4 md:p-0'>
          <h1 className='text-4xl sm:text-6xl font-bold'>{main_title}</h1>
          <p className='text-2xl sm:text-4xl'>{sub_title}</p>
        </div>
      )}
    </section>
  );
};

export default Hero;
