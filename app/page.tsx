// TESTING

import Connect from './components/sections/Connect/Connect';
import Discover from './components/sections/Discover/Discover';
import Engage from './components/sections/Engage';
import Explore from './components/sections/Explore';
import Hero from './components/sections/Hero/Hero';
import ArtistModalController from './components/ArtistGrid/ArtistModalController';
import { DisplayArtist } from './types';
import Shop from './components/sections/Shop';
import { Metadata } from 'next';
import getMetaData from './constructors/getMetaData';

interface HomeProps {
  artist?: DisplayArtist | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetaData();

  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.keywords,
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: [data?.socialImgUrl],
    },
    twitter: {
      title: data?.title,
      description: data?.description,
      images: [data?.socialImgUrl],
    },
  };
}

export default async function Home({ artist }: HomeProps) {
  return (
    <>
      {artist && <ArtistModalController artist={artist} />}
      <Hero />
      <Explore />
      <Connect />
      <Engage />
      <Shop />
      <Discover />
    </>
  );
}
