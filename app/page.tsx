import Connect from './components/sections/Connect';
import Discover from './components/sections/Discover';
import Engage from './components/sections/Engage';
import Explore from './components/sections/Explore';
import Heading from './components/Typography/Heading';

export default async function Home() {
  return (
    <main>
      <Heading title='07:17 Records' />
      <Explore />
      <Connect />
      <Engage />
      <Discover />
    </main>
  );
}
