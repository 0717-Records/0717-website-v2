import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';
import LoadingPanel from '../LoadingPanel';
import toSentenceCase from '@/app/libs/toSentenceCase';
import OptionSwitch from '../OptionSwitch';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Heading from '../typography/Heading';

export interface Artist {
  id: string;
  image?: string | null;
  description?: string | null;
  links?: any | null;
  name: string;
  display: boolean;
  listIds?: string[];
}

// Must match the values stored in Prisma
export enum ArtistListName {
  explore = 'explore',
  engage = 'engage',
}

export interface ArtistList {
  id: string;
  name: string;
  display_name: string;
  artistIds: string[];
}

interface ArtistTableProps {
  artists: Artist[];
  artistLists: ArtistList[];
}

const listIdsToString = (listIds: string[], artistLists: ArtistList[]): string => {
  if (listIds.length === 0) return '';
  const strArray = listIds.map((listId) => {
    const foundList = artistLists.find((list) => list.id === listId);
    return foundList ? toSentenceCase(foundList.name) : '';
  });
  if (strArray.length === 1) return strArray[0];
  return strArray.join(', ');
};

const getSwitchOptions = (artistLists: ArtistList[]) => [
  {
    id: 'all',
    displayName: 'Show All',
  },
  ...artistLists.map((l) => ({
    id: l.id,
    displayName: l.display_name,
  })),
];

const ArtistTable: React.FC<ArtistTableProps> = ({ artists, artistLists: artistListsDefault }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artistsToShow, setArtistsToShow] = useState(artists);
  const [artistLists, setArtistLists] = useState(artistListsDefault);
  const switchOptions = getSwitchOptions(artistLists);
  const [switchVal, setSwitchVal] = useState(switchOptions[0].id);
  const showAll = switchVal === switchOptions[0].id;
  const router = useRouter();

  const handleRowMove = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'up' | 'down'
  ) => {
    setIsLoading(true);
    e.preventDefault();
    if (showAll) return;
    try {
      const listId = switchVal;

      // Update order on server
      await axios.put(`/api/artist_list/${listId}`, {
        artistId: artistsToShow[index].id,
        direction,
      });
      router.refresh();

      // Update order on client
      let delta = 0;
      if (direction === 'up' && index > 0) delta = -1;
      if (direction === 'down' && index < artistsToShow.length) delta = 1;
      const updatedList = [...artistsToShow];
      [updatedList[index], updatedList[index + delta]] = [
        updatedList[index + delta],
        updatedList[index],
      ];
      const newIdList = updatedList.map((list) => list.id);
      const updatedArtistLists = artistLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            artistIds: newIdList,
          };
        }
        return list;
      });
      setArtistLists(updatedArtistLists);
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAll) {
      setArtistsToShow(artists);
      return;
    }
    const listToShow = artistLists.find((list) => list.id === switchVal);
    const artistIds = listToShow ? listToShow.artistIds : [];
    const artistsToShow = artistIds
      .map((id) => artists.find((artist) => artist.id === id))
      .filter((artist) => artist !== undefined) as Artist[];
    setArtistsToShow(artistsToShow);
  }, [switchVal, artistLists]);

  return (
    <div>
      {isLoading && <LoadingPanel />}
      <>
        <OptionSwitch
          value={switchVal}
          options={switchOptions.map((option) => option.id)}
          labels={switchOptions.map((option) => option.displayName)}
          onChange={(selection) => setSwitchVal(selection)}
        />
        {!artistsToShow.length ? (
          <div className='mt-4'>
            <Heading
              type='h2'
              title='No artists in this list'
              subTitle='Edit an artist to add it to this list'
            />
          </div>
        ) : (
          <table className='min-w-full divide-y divide-gray-200 mt-4'>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Location
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Display
                </th>
                {!showAll && (
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Order
                  </th>
                )}

                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {artistsToShow.map((artist, index) => (
                <tr
                  key={index}
                  className='artist-row transition-transform duration-300 ease-in-out'>
                  <td className='px-6 py-4 whitespace-normal'>
                    <div className='flex items-center'>
                      <Image
                        className='rounded-full mr-4'
                        src={artist.image || '/images/artist-img-placeholder.png'}
                        width='48'
                        height='48'
                        alt='Artist placeholder image'
                      />
                      <span className='max-w-full pr-4'>{artist.name}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {listIdsToString(artist.listIds || [], artistLists)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {artist.display ? (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        Displayed
                      </span>
                    ) : (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                        Hidden
                      </span>
                    )}
                  </td>
                  {!showAll && (
                    <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                      <UpDownArrows
                        index={index}
                        onUpClick={(e) => handleRowMove(index, e, 'up')}
                        onDownClick={(e) => handleRowMove(index, e, 'down')}
                        numRows={artistsToShow.length}
                      />
                    </td>
                  )}

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button onClick={() => {}}>
                      <FaPencilAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </div>
  );
};

export default ArtistTable;
