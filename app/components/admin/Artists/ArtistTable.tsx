'use client';

import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';
import LoadingPanel from '../LoadingPanel';
import toSentenceCase from '@/app/libs/toSentenceCase';
import OptionSwitch from '../OptionSwitch';
import Image from 'next/image';

interface ArtistRaw {
  id: string;
  image?: string | null;
  description?: string | null;
  links?: any | null;
  name: string;
  display: boolean;
}

export type ArtistData = ArtistRaw & {
  lists: string;
};

// Must match the values stored in Prisma
export enum ArtistListName {
  explore = 'explore',
  engage = 'engage',
}

interface ArtistList {
  id: string;
  name: string;
  artistIds: string[];
}

interface ArtistTableProps {
  artistsRaw: ArtistRaw[];
  artistLists: ArtistList[];
}

enum SwitchOptions {
  all = 'all',
  favourites = 'favourites',
  collabs = 'collabs',
}

// Dummy Data
const rawDummyArtists: ArtistRaw[] = [
  {
    id: '1',
    image: 'https://placekitten.com/100/100',
    name: 'Star Control',
    display: true,
  },
  {
    id: '2',
    image: 'https://placekitten.com/100/101',
    name: 'Scarlett Lashes',
    display: true,
  },
  {
    id: '3',
    image: 'https://placekitten.com/101/100',
    name: 'Shepherds of Cassini',
    display: true,
  },
  {
    id: '4',
    image: 'https://placekitten.com/101/100',
    name: 'Pilgrims Pyre',
    display: false,
  },
];

interface BuildArtistDataProps {
  artists: ArtistRaw[];
  artistLists: ArtistList[];
}

const dummyArtistLists: ArtistList[] = [
  {
    id: '1',
    name: ArtistListName.explore,
    artistIds: ['1', '2', '4'],
  },
  {
    id: '2',
    name: ArtistListName.engage,
    artistIds: ['3', '2', '4'],
  },
];

const joinArrWithCommas = (array: string[]): string => {
  if (array.length === 0) return '';
  if (array.length === 1) return array[0];
  return array.join(', ');
};

export const buildArtistData = ({ artists, artistLists }: BuildArtistDataProps): ArtistData[] => {
  return artists.map((artist) => {
    const listArr: string[] = [];
    artistLists.forEach((list) => {
      if (list.artistIds.some((id) => artist.id === id)) listArr.push(toSentenceCase(list.name));
    });
    const lists = joinArrWithCommas(listArr);
    return { ...artist, lists };
  });
};

const dummyArtists = buildArtistData({ artists: rawDummyArtists, artistLists: dummyArtistLists });

const ArtistTable: React.FC<ArtistTableProps> = ({ artistsRaw, artistLists }) => {
  const artists = buildArtistData({ artists: artistsRaw, artistLists });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artistsToShow, setArtistsToShow] = useState(artists);
  const [switchVal, setSwitchVal] = useState(SwitchOptions.all);

  const collabIds =
    artistLists.find((list) => list.name === ArtistListName.explore)?.artistIds || [];
  const collabArtists = collabIds
    .map((id) => artists.find((artist) => artist.id === id))
    .filter((artist) => artist !== undefined) as ArtistData[];

  const favIds = artistLists.find((list) => list.name === ArtistListName.engage)?.artistIds;
  const favArtists = favIds
    ?.map((id) => artists.find((artist) => artist.id === id))
    .filter((artist) => artist !== undefined) as ArtistData[];

  const handleColumnMove = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'up' | 'down'
  ) => {
    e.preventDefault();
    if (index > 0) {
      let updatedList: string[] = [];
      if (switchVal === SwitchOptions.favourites && favIds) updatedList = [...favIds];
      if (switchVal === SwitchOptions.collabs && collabIds) updatedList = [...collabIds];

      if (!updatedList.length) return;

      const delta = direction === 'up' ? -1 : 1;
      [updatedList[index], updatedList[index + delta]] = [
        updatedList[index + delta],
        updatedList[index],
      ];

      console.log(updatedList);

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

  const handleSwitchChange = (selection: SwitchOptions) => {
    setSwitchVal(selection);
    if (selection === SwitchOptions.all) setArtistsToShow(artists);
    if (selection === SwitchOptions.favourites) setArtistsToShow(favArtists);
    if (selection === SwitchOptions.collabs) setArtistsToShow(collabArtists);
  };

  return (
    <div>
      {isLoading && <LoadingPanel />}
      {!!artistsToShow.length && (
        <>
          <OptionSwitch
            value={switchVal}
            options={[SwitchOptions.all, SwitchOptions.favourites, SwitchOptions.collabs]}
            labels={['Show All', 'Favourites (Engage)', 'Collaborations (Explore)']}
            onChange={handleSwitchChange}
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
                {switchVal !== SwitchOptions.all && (
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
                  <td className='px-6 py-4 whitespace-nowrap'>{artist.lists}</td>
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
                  {switchVal !== SwitchOptions.all && (
                    <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                      <UpDownArrows
                        index={index}
                        onUpClick={(e) => handleColumnMove(index, e, 'up')}
                        onDownClick={(e) => handleColumnMove(index, e, 'down')}
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
