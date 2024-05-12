import getConnectData from '@/app/constructors/getConnectData';
import Paragraph from '../../Typography/Paragraph';
import SectionWrapper from '../../SectionWrapper';
import EventGrid from './EventGrid';

const Connect = async () => {
  const data = await getConnectData();
  if (!data) return null;
  const { title, sub_title, events, event_placeholder } = data;

  console.log(events);

  return (
    <SectionWrapper title={title} subTitle={sub_title}>
      <EventGrid events={events} />
      <Paragraph text={event_placeholder.message || ''} multiLine />
    </SectionWrapper>
  );
};

export default Connect;
