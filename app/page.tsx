import Connect from './components/sections/Connect/Connect';
import Discover from './components/sections/Discover/Discover';
import Engage from './components/sections/Engage';
import Explore from './components/sections/Explore';
import Hero from './components/sections/Hero/Hero';
import ArtistModalController from './components/ArtistGrid/ArtistModalController';
import { DisplayArtist } from './types';

interface HomeProps {
  artist?: DisplayArtist | null;
}

export default async function Home({ artist }: HomeProps) {
  return (
    <>
      {artist && <ArtistModalController artist={artist} />}
      <Hero />
      <Explore />
      <Connect />
      <Engage />
      <Discover />
    </>
  );
}
