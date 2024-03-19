import getEngageData from '@/app/constructors/getEngageData';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

const Connect = async () => {
  const data = await getEngageData();
  if (!data) return null;
  const { title, sub_title } = data;

  return (
    <div>
      <Heading title={title || ''} />
      <Paragraph text={sub_title || ''} multiLine />
    </div>
  );
};

export default Connect;
