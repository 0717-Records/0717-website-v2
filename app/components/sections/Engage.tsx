import getEngageData from '@/app/constructors/getEngageData';

import SectionWrapper from '../SectionWrapper';
import ArtistGrid from '../ArtistGrid/ArtistGrid';

const Engage = async () => {
  const data = await getEngageData();
  if (!data) return null;
  const { title, sub_title, artists } = data;

  return (
    <SectionWrapper id='engage' title={title} subTitle={sub_title}>
      <ArtistGrid artists={artists} />
    </SectionWrapper>
  );
};

export default Engage;
