import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UpDownArrows from '../UpDownArrows';
import LoadingPanel from '../LoadingPanel';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Heading from '../../Typography/Heading';
import PillDisplay from '../PillDisplay/PillDisplay';

export interface Shop {
  id: string;
  image?: string | null;
  description?: string | null;
  name: string;
  display: boolean;
  url: string;
  order: number;
}

interface ShopTableProps {
  shops: Shop[];
}

const ShopsTable = ({ shops }: ShopTableProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shopsToShow, setShopsToShow] = useState(shops);
  const router = useRouter();

  const handleRowMove = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: 'up' | 'down'
  ) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      let delta = 0;
      if (direction === 'up' && index > 0) delta = -1;
      if (direction === 'down' && index < shopsToShow.length) delta = 1;

      // Update order on server
      await axios.put(`/api/shops/${shopsToShow[index].id}`, {
        ...shopsToShow[index],
        order: shopsToShow[index + delta].order,
      });
      await axios.put(`/api/shops/${shopsToShow[index + delta].id}`, {
        ...shopsToShow[index + delta],
        order: shopsToShow[index].order,
      });

      // Update order on client
      const updatedList = [...shopsToShow];
      [updatedList[index], updatedList[index + delta]] = [
        updatedList[index + delta],
        updatedList[index],
      ];
      setShopsToShow(updatedList);

      router.refresh();
    } catch (error: any) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingPanel />}
      {!shopsToShow.length ? (
        <div className='mt-4'>
          <Heading type='h2' title='No shops in this list' subTitle='Add a shop to start.' />
        </div>
      ) : (
        <table className='min-w-full divide-y divide-gray-200 mt-4'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                URL
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
            {shopsToShow.map((shop, index) => (
              <tr key={index} className='artist-row transition-transform duration-300 ease-in-out'>
                <td className='px-6 py-4 whitespace-normal'>
                  <Link
                    href={`/admin/collections/shops/${shop.id}`}
                    className='flex items-center hover:underline'>
                    <div className='relative rounded-full mr-8 h-12 w-12 min-w-12 min-h-12 overflow-hidden'>
                      <Image
                        fill
                        className='object-cover'
                        src={shop.image || '/images/shop-img-placeholder.png'}
                        alt='Shop image'
                        sizes='48px'
                      />
                    </div>
                    <span className='grow pr-4'>{shop.name}</span>
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='grow pr-4'>{shop.url}</span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <PillDisplay
                    color={shop.display ? 'green' : 'gray'}
                    text={shop.display ? 'Displayed' : 'Hidden'}
                  />
                </td>
                <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                  <UpDownArrows
                    index={index}
                    onUpClick={(e) => handleRowMove(index, e, 'up')}
                    onDownClick={(e) => handleRowMove(index, e, 'down')}
                    numRows={shopsToShow.length}
                  />
                </td>

                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={`/admin/collections/shops/${shop.id}`}>
                    <FaPencilAlt className='hover:opacity-60' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ShopsTable;
