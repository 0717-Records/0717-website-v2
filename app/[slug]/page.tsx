import getArtistBySlug from '../actions/getArtistBySlug';
import Home from '../page';
import { redirect } from 'next/navigation';

interface IParams {
  slug: string;
}

export const generateMetadata = async ({ params }: { params: IParams }) => {
  const { slug } = params;

  const artist = await getArtistBySlug(slug);

  if (!artist) return;

  return {
    title: `07:17 Records - ${artist?.name}`,
    description: artist?.description,
  };
};

export default async function HomeWithArtistModal({ params }: { params: IParams }) {
  const { slug } = params;
  const artist = await getArtistBySlug(slug);

  if (!artist) redirect('/');

  return <Home artist={artist} />;
}
