'use client';

import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';

interface Artist {
  image: string;
  name: string;
  type: string;
  display: boolean;
  order: number;
}

interface ArtistTableProps {
  artists: Artist[];
}

// Dummy Data
const dummyArtists: Artist[] = [
  {
    image: 'https://placekitten.com/100/100',
    name: 'Artist 1',
    type: 'Painter',
    display: true,
    order: 1,
  },
  {
    image: 'https://placekitten.com/100/101',
    name: 'Artist 2',
    type: 'Sculptor',
    display: false,
    order: 2,
  },
  {
    image: 'https://placekitten.com/101/100',
    name: 'Artist 3',
    type: 'Photographer',
    display: true,
    order: 3,
  },
];

const ArtistTable: React.FC<ArtistTableProps> = ({ artists = dummyArtists }) => {
  const [editableArtists, setEditableArtists] = useState([...artists]);

  useEffect(() => {
    setEditableArtists(artists);
  }, [artists]);

  const handleMoveUp = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (index > 0) {
      const updatedArtists = [...editableArtists];
      [updatedArtists[index], updatedArtists[index - 1]] = [
        updatedArtists[index - 1],
        updatedArtists[index],
      ];

      const rowElement = document.querySelectorAll('.artist-row')[index];
      rowElement.classList.add('slide-up');

      rowElement.addEventListener(
        'transitionend',
        () => {
          setEditableArtists(updatedArtists);
          rowElement.classList.remove('slide-up');
        },
        { once: true }
      );
    }
  };

  const handleMoveDown = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (index < editableArtists.length - 1) {
      const updatedArtists = [...editableArtists];
      [updatedArtists[index], updatedArtists[index + 1]] = [
        updatedArtists[index + 1],
        updatedArtists[index],
      ];

      const rowElement = document.querySelectorAll('.artist-row')[index];
      rowElement.classList.add('slide-down');

      rowElement.addEventListener(
        'transitionend',
        () => {
          setEditableArtists(updatedArtists);
          rowElement.classList.remove('slide-down');
        },
        { once: true }
      );
    }
  };

  return (
    <div>
      {!!editableArtists.length && (
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Type
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Display
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Order
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {editableArtists.map((artist, index) => (
              <tr key={index} className='artist-row'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <img
                      className='h-8 w-8 rounded-full mr-2'
                      src={artist.image}
                      alt={`Artist ${artist.name}`}
                    />
                    <span>{artist.name}</span>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{artist.type}</td>
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
                <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                  <UpDownArrows
                    index={index}
                    onUpClick={(e) => handleMoveUp(index, e)}
                    onDownClick={(e) => handleMoveDown(index, e)}
                    numRows={editableArtists.length}
                  />
                </td>
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
    </div>
  );
};

export default ArtistTable;
