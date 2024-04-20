import styles from './styles.module.css';
import FeaturedHeroContent from './FeaturedHeroContent';
import getHeroData from '@/app/constructors/getHeroDate';
import HeroImages from './HeroImages';

const Hero = async () => {
  const data = await getHeroData();
  if (!data) return null;
  const { main_title, sub_title, events, images } = data;

  const hasFeaturedContent = events.length > 0;
  // const images = [
  //   {
  //     path: '/images/test-hero-images/hero-img-1.jpg',
  //     alt: 'Star Control gig at Wine Cellar',
  //   },
  //   {
  //     path: '/images/test-hero-images/hero-img-2.avif',
  //     alt: 'Rock gig image 2',
  //   },
  //   {
  //     path: '/images/test-hero-images/hero-img-3.avif',
  //     alt: 'Rock gig image 3',
  //   },
  //   {
  //     path: '/images/test-hero-images/hero-img-4.avif',
  //     alt: 'Rock gig image 4',
  //   },
  // ];

  return (
    <section className={`relative ${styles['hero-height']} bg-black`}>
      <HeroImages images={images} />
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
