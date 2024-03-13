import getExploreData from '@/app/constructors/getExploreData';
import Heading from '../admin/Typography/Heading';

const Explore = async () => {
  const data = await getExploreData();
  if (!data) return null;
  const { title, sub_title, artist_placeholder } = data;
  return (
    <div>
      <Heading title={title || ''} />
      <p>{sub_title}</p>
      <p>{artist_placeholder.message}</p>
    </div>
  );
};

export default Explore;
