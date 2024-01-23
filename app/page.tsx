import Image from 'next/image';
import Discover from './components/sections/Discover';
import Explore from './components/sections/Explore';
import MyHeading from './components/MyHeading';

export default async function Home() {
  return (
    <main>
      <MyHeading title='07:17 Records' />
      <Explore />
      <Discover />
      <MyHeading title='Heading 1' />
      <MyHeading title='Heading 2' type='h2' subTitle='Yes this is heading' />
      <MyHeading title='Heading 3' type='h3' />
      <MyHeading title='Heading 4' type='h4' />
      <MyHeading title='Heading 5' type='h5' />
      <MyHeading title='Heading 6' type='h6' />
    </main>
  );
}
