import Connect from './components/sections/Connect';
import Discover from './components/sections/Discover';
import Engage from './components/sections/Engage';
import Explore from './components/sections/Explore';
import Hero from './components/sections/Hero/Hero';

export default async function Home() {
  return (
    <>
      <Hero />
      {/* <Explore /> */}
      <Connect />
      <Engage />
      <Discover />
    </>
  );
}
