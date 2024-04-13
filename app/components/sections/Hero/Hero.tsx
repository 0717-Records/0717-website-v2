import Image from 'next/image';
import styles from './styles.module.css';

const Hero = () => {
  const title = 'Welcome to 07:17 Records';
  const subtitle = 'Thank you for creating';
  const imageUrl = '/images/star-control-hero.jpg';

  const hasFeaturedContent = true;

  const featuredContent = (
    <>
      <div className='absolute inset-0 bg-black opacity-40' />
      <div className='absolute w-full h-full text-white text-center flex flex-col justify-between items-center'>
        <h1 className='text-4xl sm:text-6xl font-bold'>{title}</h1>
        <div className='h-80 w-4/5 bg-red-300'></div>
        <p className='text-2xl sm:text-4xl'>{subtitle}</p>
      </div>
    </>
  );

  const noFeaturedContent = (
    <div className='absolute bottom-20 md:bottom-20 right-1/2 lg:right-44 text-center lg:text-right text-white space-y-4 translate-x-1/2 lg:translate-x-0 w-full p-4 md:p-0'>
      <h1 className='text-4xl sm:text-6xl font-bold'>{title}</h1>
      <p className='text-2xl sm:text-4xl'>{subtitle}</p>
    </div>
  );

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
      {hasFeaturedContent ? featuredContent : noFeaturedContent}
    </section>
  );
};

export default Hero;
