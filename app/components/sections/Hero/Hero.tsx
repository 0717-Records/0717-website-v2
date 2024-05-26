import styles from './styles.module.css';
import FeaturedHeroContent from './FeaturedHeroContent';
import getHeroData from '@/app/constructors/getHeroData';
import HeroImages from './HeroImages';

const Hero = async () => {
  const data = await getHeroData();
  if (!data) return null;
  const { main_title, sub_title, events, images } = data;

  const hasFeaturedContent = events.length > 0;

  return (
    <section id='home' className={`relative ${styles['hero-height']} bg-black`}>
      <HeroImages images={images} />
      {hasFeaturedContent ? (
        <FeaturedHeroContent title={main_title} subtitle={sub_title} events={events} />
      ) : (
        <>
          <div className='absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20' />
          <div className='absolute z-30 bottom-10 md:bottom-20 right-1/2 lg:right-44 text-center lg:text-right text-white space-y-4 translate-x-1/2 lg:translate-x-0 w-full p-4 md:p-0'>
            <h1 className='text-4xl sm:text-6xl font-bold'>{main_title}</h1>
            <p className='text-2xl sm:text-4xl'>{sub_title}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
