import getDiscoverData from '@/app/constructors/getDiscoverData';
import Heading from '../admin/typography/Heading';

const Discover = async () => {
  const data = await getDiscoverData();
  if (!data) return null;
  const { title, sub_title, message_1, vision_statement, mission_statement } = data;
  return (
    <div>
      <Heading title={title || ''} />
      <p>{sub_title}</p>
      <Heading type='h2' title={message_1.heading || ''} />
      <p>{message_1.description}</p>
      <Heading type='h2' title={vision_statement.heading || ''} />
      <p>{vision_statement.description}</p>
      <Heading type='h2' title={mission_statement.heading || ''} />
      <p>{mission_statement.description}</p>
    </div>
  );
};

export default Discover;
