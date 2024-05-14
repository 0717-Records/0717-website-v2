import getDiscoverData from '@/app/constructors/getDiscoverData';
import Heading from '../../Typography/Heading';
import Paragraph from '../../Typography/Paragraph';
import SectionWrapper from '../../SectionWrapper';
import LinkPanel from './LinkPanel';

const Discover = async () => {
  const data = await getDiscoverData();
  if (!data) return null;
  const { title, sub_title, message_1, vision_statement, mission_statement, links } = data;

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      <LinkPanel links={links} />
      {/* Message 1 */}
      <Heading type='h3' title={message_1.heading || ''} />
      <Paragraph multiLine text={message_1.description || ''} className='mb-10' />
      {/* Vision Statement */}
      <Heading type='h3' title={vision_statement.heading || ''} className='text-4xl' />
      <Paragraph multiLine text={vision_statement.description || ''} className='mb-10 text-xl' />
      {/* Mission Statement */}
      <Heading type='h3' title={mission_statement.heading || ''} className='text-4xl' />
      <Paragraph multiLine text={mission_statement.description || ''} className='text-xl' />
    </SectionWrapper>
  );
};

export default Discover;
