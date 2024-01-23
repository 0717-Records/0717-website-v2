import Heading from '../Heading';
import getDiscoverData from '@/app/constructors/getDiscoverData';

const Discover = async () => {
  const data = await getDiscoverData();
  if (!data) return null;
  const { title, sub_title, message_1, vision_statement, mission_statement } = data;
  return (
    <div>
      <Heading>{title || ''}</Heading>
      <p>{sub_title}</p>
      <Heading type='h2'>{message_1.heading || ''}</Heading>
      <p>{message_1.description}</p>
      <Heading type='h2'>{vision_statement.heading || ''}</Heading>
      <p>{vision_statement.description}</p>
      <Heading type='h2'>{mission_statement.heading || ''}</Heading>
      <p>{mission_statement.description}</p>
    </div>
  );
};

export default Discover;
