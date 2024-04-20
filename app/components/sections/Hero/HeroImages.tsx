'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroImage {
  path: string;
  alt?: string;
}

interface HeroImagesProps {
  images: HeroImage[];
  duration?: number;
}

const HeroImages = ({ images, duration = 4000 }: HeroImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);
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
            alt={image.alt || 'Rotating hero image'}
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
