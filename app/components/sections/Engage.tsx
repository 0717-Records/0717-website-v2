import getEngageData from '@/app/constructors/getEngageData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import SectionWrapper from '../SectionWrapper';

const Connect = async () => {
  const data = await getEngageData();
  if (!data) return null;
  const { title, sub_title } = data;

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      {''}
    </SectionWrapper>
  );
};

export default Connect;
