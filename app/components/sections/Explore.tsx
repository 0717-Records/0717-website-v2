import getExploreData from '@/app/constructors/getExploreData';
import SectionWrapper from '../SectionWrapper';
import ArtistGrid from '../ArtistGrid/ArtistGrid';
import getMetaData from '@/app/constructors/getMetaData';

const Explore = async () => {
  const data = await getExploreData();
  const meta = await getMetaData();
  if (!data) return null;
  const { title, sub_title, artist_placeholder, artists, email } = data;

  return (
    <SectionWrapper id='explore' title={title} subTitle={sub_title}>
      <ArtistGrid
        artists={artists}
        placeholder
        placeHolderText={artist_placeholder.message}
        email={email || ''}
        pageTitle={meta?.title}
      />
    </SectionWrapper>
  );
};

export default Explore;
