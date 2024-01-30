'use client';

import { useRouter } from 'next/navigation';
import Heading from './typography/Heading';
import Button from './ui/Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing to show here!',
  subtitle = 'Please check spelling of URLs and filters.',
}) => <Heading title={title} subTitle={subtitle} />;

export default EmptyState;
