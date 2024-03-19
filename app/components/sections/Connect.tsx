import getConnectData from '@/app/constructors/getConnectData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

const Connect = async () => {
  const data = await getConnectData();
  if (!data) return null;
  const { title, sub_title, event_placeholder } = data;

  return (
    <div>
      <Heading title={title || ''} />
      <Paragraph text={sub_title || ''} multiLine />
      <Paragraph text={event_placeholder.message || ''} multiLine />
    </div>
  );
};

export default Connect;
