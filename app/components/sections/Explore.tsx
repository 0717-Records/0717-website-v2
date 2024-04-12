import getExploreData from '@/app/constructors/getExploreData';
import Paragraph from '../Typography/Paragraph';
import SectionWrapper from '../SectionWrapper';

const Explore = async () => {
  const data = await getExploreData();
  if (!data) return null;
  const { title, sub_title, artist_placeholder } = data;

  // const title = 'Explore';
  // const sub_title = 'We take pride.';
  // const artist_placeholder = {
  //   message: 'Keen to collaborate?',
  // };

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      <Paragraph text={artist_placeholder.message || ''} multiLine />
    </SectionWrapper>
  );
};

export default Explore;
