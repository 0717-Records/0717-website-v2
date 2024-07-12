import getEngageData from '@/app/constructors/getEngageData';

import SectionWrapper from '../SectionWrapper';
import ArtistGrid from '../ArtistGrid/ArtistGrid';
import getMetaData from '@/app/constructors/getMetaData';

const Engage = async () => {
  const data = await getEngageData();
  const meta = await getMetaData();
  if (!data) return null;
  const { title, sub_title, artists } = data;

  return (
    <SectionWrapper id='engage' title={title} subTitle={sub_title}>
      <ArtistGrid artists={artists} pageTitle={meta?.title} />
    </SectionWrapper>
  );
};

export default Engage;
