import getConnectData from '@/app/constructors/getConnectData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import SectionWrapper from '../SectionWrapper';

const Connect = async () => {
  const data = await getConnectData();
  if (!data) return null;
  const { title, sub_title, event_placeholder } = data;

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      <Paragraph text={event_placeholder.message || ''} multiLine />
    </SectionWrapper>
  );
};

export default Connect;
