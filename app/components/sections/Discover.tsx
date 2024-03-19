import getDiscoverData from '@/app/constructors/getDiscoverData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import SectionWrapper from '../SectionWrapper';

const Discover = async () => {
  const data = await getDiscoverData();
  if (!data) return null;
  const { title, sub_title, message_1, vision_statement, mission_statement, links } = data;

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      <Heading type='h3' title={message_1.heading || ''} />
      <Paragraph multiLine text={message_1.description || ''} />
      <Heading type='h3' title={vision_statement.heading || ''} />
      <Paragraph multiLine text={vision_statement.description || ''} />
      <Heading type='h3' title={mission_statement.heading || ''} />
      <Paragraph multiLine text={mission_statement.description || ''} />
    </SectionWrapper>
  );
};

export default Discover;
