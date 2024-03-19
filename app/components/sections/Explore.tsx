import getExploreData from '@/app/constructors/getExploreData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

const Explore = async () => {
  const data = await getExploreData();
  console.log(data);
  if (!data) return null;
  const { title, sub_title, artist_placeholder } = data;

  const formattedSubTitle = sub_title?.replace(/\n/g, '<br>') || '';

  return (
    <div>
      <Heading title={title || ''} />
      <p dangerouslySetInnerHTML={{ __html: formattedSubTitle }} />
      <p>{artist_placeholder.message}</p>
    </div>
  );
};

export default Explore;
