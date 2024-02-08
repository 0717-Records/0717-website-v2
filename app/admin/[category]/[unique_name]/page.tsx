import getArtists from '@/app/actions/getArtists';
import EditSectionClient from './EditSectionClient';
import getSectionByName from '@/app/actions/getSectionByName';
import EmptyState from '@/app/components/EmptyState';
import ScrollToTop from '@/app/components/ScrollToTop';
import ArtistTable, { Artist, ArtistList } from '@/app/components/admin/Artists/ArtistTable';
import getArtistLists from '@/app/actions/getArtistLists';

interface IParams {
  unique_name?: string;
  category?: string;
}

const EditSectionPage = async ({ params }: { params: IParams }) => {
  const { category, unique_name } = params;
  if (!unique_name || !category) return <EmptyState />;
  const section = await getSectionByName({ sectionName: unique_name, category });

  const artists: Artist[] = await getArtists();
  const artistLists: ArtistList[] = await getArtistLists();

  if (!section) return <EmptyState />;
  return (
    <>
      <ScrollToTop />
      {section.custom ? (
        <ArtistTable artists={artists} artistLists={artistLists} />
      ) : (
        <EditSectionClient {...section} />
      )}
    </>
  );
};

export default EditSectionPage;
