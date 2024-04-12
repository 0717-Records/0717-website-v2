import Image from 'next/image';

const Hero = () => {
  const title = 'Welcome to 07:17 Records';
  const subtitle = 'Thank you for creating';
  const imageUrl = '/images/star-control-hero.jpg';

  return (
    <div className='relative w-full hero-height-mobile sm:hero-height-desktop'>
      <Image
        src={imageUrl}
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        alt='Star Control playing at Wine Cellar'
        className='select-none pointer-events-none'
        priority
      />
      {/* <div className='absolute inset-0 bg-black opacity-40' /> */}
      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-99' />
      <div className='absolute bottom-20 md:bottom-20 right-1/2 md:right-44 text-center md:text-right text-white space-y-4 translate-x-1/2 md:translate-x-0'>
        <h1 className='text-4xl font-bold shadow-md'>{title}</h1>
        <p className='text-2xl shadow-md'>{subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;
