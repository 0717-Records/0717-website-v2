'use client';

import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';
import LoadingPanel from '../LoadingPanel';
import toSentenceCase from '@/app/libs/toSentenceCase';
import OptionSwitch from '../OptionSwitch';
import Image from 'next/image';

export interface Artist {
  id: string;
  image?: string | null;
  description?: string | null;
  links?: any | null;
  name: string;
  display: boolean;
  listIds?: string[];
}

// export type ArtistData = ArtistRaw & {
//   lists: string;
// };

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

// enum SwitchOptions {
//   all = 'all',
//   favourites = 'favourites',
//   collabs = 'collabs',
// }

// Dummy Data
// const rawDummyArtists: ArtistRaw[] = [
//   {
//     id: '1',
//     image: 'https://placekitten.com/100/100',
//     name: 'Star Control',
//     display: true,
//   },
//   {
//     id: '2',
//     image: 'https://placekitten.com/100/101',
//     name: 'Scarlett Lashes',
//     display: true,
//   },
//   {
//     id: '3',
//     image: 'https://placekitten.com/101/100',
//     name: 'Shepherds of Cassini',
//     display: true,
//   },
//   {
//     id: '4',
//     image: 'https://placekitten.com/101/100',
//     name: 'Pilgrims Pyre',
//     display: false,
//   },
// ];
// const rawDummyArtists: ArtistRaw[] = [];

// interface BuildArtistDataProps {
//   artists: ArtistRaw[];
//   artistLists: ArtistList[];
// }

// EXPLORE: Star Control, Scarlett Lashes, Pilgrim's Pyre
// ENGAGE: Shepherds of Cassini, Scarlett Lashes, Pilgrim's Pyre

// const dummyArtistLists: ArtistList[] = [
//   {
//     id: '1',
//     name: ArtistListName.explore,
//     artistIds: ['1', '2', '4'],
//   },
//   {
//     id: '2',
//     name: ArtistListName.engage,
//     artistIds: ['3', '2', '4'],
//   },
// ];

const listIdsToString = (listIds: string[], artistLists: ArtistList[]): string => {
  if (listIds.length === 0) return '';
  const strArray = listIds.map((listId) => {
    const foundList = artistLists.find((list) => list.id === listId);
    return foundList ? toSentenceCase(foundList.name) : '';
  });
  if (strArray.length === 1) return strArray[0];
  return strArray.join(', ');
};

// export const buildArtistData = ({ artists, artistLists }: BuildArtistDataProps): ArtistData[] => {
//   return artists.map((artist) => {
//     const listArr: string[] = [];
//     artistLists.forEach((list) => {
//       if (list.artistIds.some((id) => artist.id === id)) listArr.push(toSentenceCase(list.name));
//     });
//     const lists = joinArrWithCommas(listArr);
//     return { ...artist, lists };
//   });
// };

// const dummyArtists = buildArtistData({ artists: rawDummyArtists, artistLists: dummyArtistLists });

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

const ArtistTable: React.FC<ArtistTableProps> = ({ artists, artistLists }) => {
  const switchOptions = getSwitchOptions(artistLists);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artistsToShow, setArtistsToShow] = useState(artists);
  const [switchVal, setSwitchVal] = useState(switchOptions[0].id);
  const [currentListId, setCurrentListId] = useState<string | null>(null);

  const showAll = switchVal === switchOptions[0].id;

  // const collabIds =
  //   artistLists.find((list) => list.name === ArtistListName.explore)?.artistIds || [];
  // const collabArtists = collabIds
  //   .map((id) => artists.find((artist) => artist.id === id))
  //   .filter((artist) => artist !== undefined) as Artist[];

  // const favIds = artistLists.find((list) => list.name === ArtistListName.engage)?.artistIds;
  // const favArtists = favIds
  //   ?.map((id) => artists.find((artist) => artist.id === id))
  //   .filter((artist) => artist !== undefined) as Artist[];

  const handleRowMove = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'up' | 'down'
  ) => {
    e.preventDefault();
    if (index > 0) {
      if (showAll) return;
      // let updatedList: string[] = [];
      // if (switchVal === SwitchOptions.favourites && favIds) updatedList = [...favIds];
      // if (switchVal === SwitchOptions.collabs && collabIds) updatedList = [...collabIds];

      // if (!updatedList.length) return;

      // const delta = direction === 'up' ? -1 : 1;
      // [updatedList[index], updatedList[index + delta]] = [
      //   updatedList[index + delta],
      //   updatedList[index],
      // ];

      // console.log(updatedList);

      // set loading
      // setIsLoading(true);

      // make database call

      // show toast

      // set loading

      // const rowElement = document.querySelectorAll('.artist-row')[index];
      // console.log(rowElement);

      // rowElement.classList.add('translate-y-[-100%]');

      // rowElement.addEventListener(
      //   'transitionend',
      //   () => {
      //     // setEditableArtists(updatedArtists);
      //     rowElement.classList.remove('translate-y-[-100%]');
      //   },
      //   { once: true }
      // );
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
  }, [switchVal]);

  return (
    <div>
      {isLoading && <LoadingPanel />}
      {!!artistsToShow.length && (
        <>
          <OptionSwitch
            value={switchVal}
            options={switchOptions.map((option) => option.id)}
            labels={switchOptions.map((option) => option.displayName)}
            onChange={(selection) => setSwitchVal(selection)}
          />
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
        </>
      )}
    </div>
  );
};

export default ArtistTable;
