import Connect from './components/sections/Connect';
import Discover from './components/sections/Discover';
import Engage from './components/sections/Engage';
import Explore from './components/sections/Explore';

export default async function Home() {
  return (
    <>
      <div className='mt-40'></div>
      <Explore />
      {/* <Connect />
      <Engage />
      <Discover /> */}
    </>
  );
}
