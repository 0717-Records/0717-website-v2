import Image from 'next/image';
import styles from './styles.module.css';
import FeaturedHeroContent from './FeaturedHeroContent';

const Hero = () => {
  const title = 'Welcome to 07:17 Records';
  const subtitle = 'Thank you for creating';
  const imageUrl = '/images/star-control-hero.jpg';

  const hasFeaturedContent = true;

  return (
    <section className={`relative w-full ${styles['hero-height']}`}>
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
        <FeaturedHeroContent title={title} subtitle={subtitle} />
      ) : (
        <div className='absolute bottom-20 md:bottom-20 right-1/2 lg:right-44 text-center lg:text-right text-white space-y-4 translate-x-1/2 lg:translate-x-0 w-full p-4 md:p-0'>
          <h1 className='text-4xl sm:text-6xl font-bold'>{title}</h1>
          <p className='text-2xl sm:text-4xl'>{subtitle}</p>
        </div>
      )}
    </section>
  );
};

export default Hero;
