import getExploreData from '@/app/constructors/getExploreData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

const Explore = async () => {
  const data = await getExploreData();
  if (!data) return null;
  const { title, sub_title, artist_placeholder } = data;

  return (
    <div>
      <Heading title={title || ''} />
      <Paragraph text={sub_title || ''} multiLine />
      <Paragraph text={artist_placeholder.message || ''} multiLine />
    </div>
  );
};

export default Explore;
