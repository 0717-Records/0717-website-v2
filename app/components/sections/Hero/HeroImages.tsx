'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    path: '/images/test-hero-images/hero-img-1.jpg',
    alt: 'Star Control gig at Wine Cellar',
  },
  {
    path: '/images/test-hero-images/hero-img-2.avif',
    alt: 'Rock gig image',
  },
];

const HeroImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => {
      if (newInterval) clearInterval(newInterval);
    };
  }, []);

  return (
    <div>
      {images.map((image, index) => {
        return (
          <Image
            priority
            key={index}
            src={image.path}
            alt={image.alt}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            className={`absolute top-0 left-0 w-full h-full transition duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        );
      })}
    </div>
  );
};

export default HeroImages;
