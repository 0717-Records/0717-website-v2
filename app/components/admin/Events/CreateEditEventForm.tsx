import React, { useEffect, useRef, useState } from 'react';
import EditContainer from '../EditSection/EditContainer';
import Input from '../Inputs/Input';
import YesNoSwitch from '../Inputs/YesNoSwitch';
import LinkTable from '../LinkTable/LinkTable';
import HeaderBar from '../HeaderBar';
import Heading from '../Typography/Heading';
import Button from '../ui/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageUpload, { deleteImgFromCloudinary } from '../ImageUpload';
import DatePicker from '../Inputs/DatePicker';
import PillDisplay from '../PillDisplay';
import isActiveByDates from '@/app/libs/isActiveByDates';

const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

interface CreateEditEventFormProps {
  title: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: any;
  secondaryButtonLabel?: string;
  isEdit?: boolean;
}

const CreateEditEventForm = ({
  title,
  isLoading = false,
  onSubmit,
  defaultValues = {},
  secondaryButtonLabel = 'Cancel',
  isEdit = false,
}: CreateEditEventFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const imageSrc = watch('imageSrc');
  const connectDisplay = watch('connectDisplay');
  const connectStartDate = watch('connectStartDate');
  const featuredDisplay = watch('featuredDisplay');
  const featuredStartDate = watch('featuredStartDate');
  const featuredEndDate = watch('featuredEndDate');
  const links = watch('links');
  const shadowDisplay = watch('shadowDisplay');

  const isMounted = useRef(false);
  const deleteOnUnmount = useRef(true);
  const imageSrcRef = useRef(imageSrc);

  const [activeInConnect, setActiveInConnect] = useState(true);
  const [activeInFeatured, setActiveInFeatured] = useState(true);

  useEffect(() => {
    imageSrcRef.current = imageSrc;
  }, [imageSrc]);

  // Delete orphaned image on cloudinary if it exists upon unmount
  // (i.e if we selected an image but are exiting without saving)
  useEffect(() => {
    return () => {
      if (isMounted.current && deleteOnUnmount.current) {
        if (imageSrcRef.current && imageSrcRef.current !== defaultValues.imageSrc) {
          deleteImgFromCloudinary({ folderName, url: imageSrcRef.current });
        }
      }
      isMounted.current = true;
    };
  }, []);

  // Manage Connect display
  useEffect(() => {
    setActiveInConnect(connectDisplay && isActiveByDates({ startDate: connectStartDate }));
  }, [connectDisplay, connectStartDate]);

  // Manage Featured display
  useEffect(() => {
    setActiveInFeatured(
      featuredDisplay && isActiveByDates({ startDate: featuredStartDate, endDate: featuredEndDate })
    );
  }, [featuredDisplay, featuredStartDate, featuredEndDate]);

  const clearFreatuedEndDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCustomValue('featuredEndDate', null);
  };

  return (
    <>
      <HeaderBar>
        <Heading title={title} />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => router.push('/admin/collections/events')}>
            {secondaryButtonLabel}
          </Button>
          {isEdit && (
            <Button
              className='ml-2'
              outline
              disabled={isLoading}
              onClick={() => {
                if (imageSrcRef.current && imageSrcRef.current !== defaultValues.imageSrc) {
                  deleteImgFromCloudinary({ folderName, url: imageSrcRef.current });
                }
                reset(defaultValues);
              }}>
              Reset
            </Button>
          )}
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={(e) => {
              e.preventDefault();
              deleteOnUnmount.current = false;
              handleSubmit(onSubmit)(e);
            }}>
            Save
          </Button>
        </div>
      </HeaderBar>
      <form>
        <EditContainer>
          <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <ImageUpload
            label='Image'
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
            disabled={isLoading}
            isEdit={isEdit}
          />
          <Input
            id='imageUrl'
            label='Image Url'
            disabled={isLoading}
            register={register}
            errors={errors}
          />
        </EditContainer>
        <EditContainer
          heading='Connect'
          pillDisplay={
            activeInConnect
              ? { color: 'green', text: 'Displaying' }
              : { color: 'gray', text: 'Not Showing' }
          }>
          <YesNoSwitch
            disabled={isLoading}
            value={connectDisplay}
            label='Connect Display?'
            onChange={(value) => setCustomValue('connectDisplay', value)}
          />
          {connectDisplay && (
            <DatePicker
              disabled={isLoading}
              value={connectStartDate}
              label='Display Start Date'
              onChange={(value) => setCustomValue('connectStartDate', value)}
            />
          )}
        </EditContainer>
        <EditContainer
          heading='Featured'
          pillDisplay={
            activeInFeatured
              ? { color: 'green', text: 'Displaying' }
              : { color: 'gray', text: 'Not Showing' }
          }>
          <YesNoSwitch
            disabled={isLoading}
            value={featuredDisplay}
            label='Featured Event?'
            onChange={(value) => setCustomValue('featuredDisplay', value)}
          />
          {featuredDisplay && (
            <>
              <DatePicker
                disabled={isLoading}
                value={featuredStartDate}
                label='Display Start Date'
                onChange={(value) => setCustomValue('featuredStartDate', value)}
              />
              <div className='flex items-center gap-2 mt-4'>
                <DatePicker
                  disabled={isLoading}
                  value={featuredEndDate}
                  label='Display End Date'
                  onChange={(value) => setCustomValue('featuredEndDate', value)}
                />
                <Button onClick={clearFreatuedEndDate} small outline className='mt-8'>
                  Clear
                </Button>
              </div>

              <LinkTable
                links={links}
                onUpdateLinks={(value) => setCustomValue('links', value)}
                disabled={isLoading}
              />
            </>
          )}
        </EditContainer>
        <EditContainer heading='Shadow Overlay'>
          <YesNoSwitch
            disabled={isLoading}
            value={shadowDisplay}
            label='Display?'
            onChange={(value) => setCustomValue('shadowDisplay', value)}
          />
        </EditContainer>
      </form>
    </>
  );
};

export default CreateEditEventForm;
