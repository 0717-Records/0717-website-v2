import getArtistBySlug from '../actions/getArtistBySlug';
import Home from '../page';

interface IParams {
  slug: string;
}

export default async function HomeWithArtistModal({ params }: { params: IParams }) {
  const { slug } = params;
  const artist = await getArtistBySlug(slug);

  return <Home artist={artist} />;
}
