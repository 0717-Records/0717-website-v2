import getExploreData from '@/app/constructors/getExploreData';
import Paragraph from '../Typography/Paragraph';
import SectionWrapper from '../SectionWrapper';
import ArtistGrid from '../ArtistGrid/ArtistGrid';

const Explore = async () => {
  const data = await getExploreData();
  if (!data) return null;
  const { title, sub_title, artist_placeholder, artists } = data;

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      <Paragraph text={artist_placeholder.message || ''} multiLine />
      <ArtistGrid artists={artists} />
    </SectionWrapper>
  );
};

export default Explore;
