import Discover from './components/sections/Discover';
import Explore from './components/sections/Explore';
import Heading from './components/Typography/Heading';

export default async function Home() {
  return (
    <main>
      <Heading title='07:17 Records' />
      <Explore />
      <Discover />
    </main>
  );
}
