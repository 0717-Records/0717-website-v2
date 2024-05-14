import getDiscoverData from '@/app/constructors/getDiscoverData';
import Heading from '../../Typography/Heading';
import Paragraph from '../../Typography/Paragraph';
import SectionWrapper from '../../SectionWrapper';
import LinkPanel from './LinkPanel';
import CopyEmail from '../../CopyEmail';

const Discover = async () => {
  const data = await getDiscoverData();
  if (!data) return null;
  const { title, sub_title, message_1, vision_statement, mission_statement, links, email } = data;

  return (
    <SectionWrapper title={title} subTitle={sub_title} className='p-8 rounded-lg'>
      <LinkPanel links={links} />
      {/* Message 1 */}
      <Heading
        type='h3'
        title={message_1.heading || ''}
        className='text-2xl font-bold text-primary_yellow_dark'
      />
      <Paragraph
        multiLine
        text={message_1.description || ''}
        className='text-primary_yellow_dark'
      />

      {/* Vision Statement */}
      <div className='mt-12 mb-8 p-6 bg-gradient-to-r from-primary_yellow/50 to-primary_yellow_light/20 rounded-md shadow-lg'>
        <Heading
          type='h3'
          title={vision_statement.heading || ''}
          className='text-4xl font-semibold text-primary_yellow_dark mb-4'
        />
        <Paragraph
          multiLine
          text={vision_statement.description || ''}
          className='text-xl text-primary_yellow_dark'
        />
      </div>
      {/* Mission Statement */}
      <div className='p-6 bg-gradient-to-r from-primary_yellow/50 to-primary_yellow_light/20 rounded-md shadow-lg mb-8'>
        <Heading
          type='h3'
          title={mission_statement.heading || ''}
          className='text-4xl font-semibold text-primary_yellow_dark mb-4'
        />
        <Paragraph
          multiLine
          text={mission_statement.description || ''}
          className='text-xl text-primary_yellow_dark'
        />
      </div>
      <CopyEmail email={email} />
    </SectionWrapper>
  );
};

export default Discover;
