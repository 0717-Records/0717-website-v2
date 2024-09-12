import React, { useEffect, useRef, useState } from 'react';
import EditContainer from '../EditSection/EditContainer';
import Input from '../Inputs/Input';
import YesNoSwitch from '../Inputs/YesNoSwitch';
import LinkTable from '../LinkTable/LinkTable';
import HeaderBar from '../HeaderBar';
import Heading from '../../Typography/Heading';
import Button from '../ui/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageUpload, { deleteImgFromCloudinary } from '../ImageUpload';
import DatePicker from '../Inputs/DatePicker';
import isActiveByDates from '@/app/libs/isActiveByDates';
import TextArea from '../Inputs/TextArea';
import validDates from '@/app/libs/validDates';
import toast from 'react-hot-toast';

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
  const shadowStartDate = watch('shadowStartDate');
  const shadowEndDate = watch('shadowEndDate');

  const imageSrcRef = useRef(imageSrc);

  const [activeInConnect, setActiveInConnect] = useState(true);
  const [activeInFeatured, setActiveInFeatured] = useState(true);
  const [shadowActive, setShadowActive] = useState(true);
  const [saving, setSaving] = useState<boolean>(false);

  const resetImageRef = useRef<() => void>(null); // Create a ref for the resetImage function
  const resetForm = () => {
    reset(defaultValues); // Reset the form
    if (resetImageRef.current) {
      resetImageRef.current(); // This will delete the image if needed
    }
  };

  useEffect(() => {
    imageSrcRef.current = imageSrc;
  }, [imageSrc]);

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

  // Manage shadow overlay display
  useEffect(() => {
    setShadowActive(
      shadowDisplay && isActiveByDates({ startDate: shadowStartDate, endDate: shadowEndDate })
    );
  }, [shadowDisplay, shadowStartDate, shadowEndDate]);

  // Logic to clear dates
  const clearFeatuedEndDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCustomValue('featuredEndDate', null);
  };
  const clearShadowEndDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCustomValue('shadowEndDate', null);
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
            <Button className='ml-2' outline disabled={isLoading} onClick={resetForm}>
              Reset
            </Button>
          )}
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={(e) => {
              e.preventDefault();
              setSaving(true);
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
            shape='portrait'
            saving={saving}
            resetImageRef={resetImageRef}
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
                isDateValid={(startDate) => validDates(startDate, featuredEndDate)}
                onInvalidDate={() => toast.error('Start Date must on or before End Date!')}
              />
              <div className='flex items-center gap-2 mt-4 mb-10'>
                <DatePicker
                  disabled={isLoading}
                  value={featuredEndDate}
                  label='Display End Date'
                  onChange={(value) => setCustomValue('featuredEndDate', value)}
                  isDateValid={(endDate) => validDates(featuredStartDate, endDate)}
                  onInvalidDate={() => toast.error('Start Date must on or before End Date!')}
                />
                <Button onClick={clearFeatuedEndDate} small outline className='mt-8'>
                  Clear
                </Button>
              </div>
              <Heading title='Featured Links' type='h4' />

              <LinkTable
                links={links}
                onUpdateLinks={(value) => setCustomValue('links', value)}
                disabled={isLoading}
                forEvents
              />
            </>
          )}
        </EditContainer>
        <EditContainer
          heading='Shadow Overlay'
          pillDisplay={
            shadowActive
              ? { color: 'green', text: 'Displaying' }
              : { color: 'gray', text: 'Not Showing' }
          }>
          <YesNoSwitch
            disabled={isLoading}
            value={shadowDisplay}
            label='Display?'
            onChange={(value) => setCustomValue('shadowDisplay', value)}
          />
          {shadowDisplay && (
            <>
              <DatePicker
                disabled={isLoading}
                value={shadowStartDate}
                label='Display Start Date'
                onChange={(value) => setCustomValue('shadowStartDate', value)}
                isDateValid={(startDate) => validDates(startDate, shadowEndDate)}
                onInvalidDate={() => toast.error('Start Date must on or before End Date!')}
              />
              <div className='flex items-center gap-2 mt-4 mb-10'>
                <DatePicker
                  disabled={isLoading}
                  value={shadowEndDate}
                  label='Display End Date'
                  onChange={(value) => setCustomValue('shadowEndDate', value)}
                  isDateValid={(endDate) => validDates(shadowStartDate, endDate)}
                  onInvalidDate={() => toast.error('Start Date must on or before End Date!')}
                />
                <Button onClick={clearShadowEndDate} small outline className='mt-8'>
                  Clear
                </Button>
              </div>
              <TextArea
                id='shadowMessage'
                label='Message to include on overlay'
                disabled={isLoading}
                register={register}
                errors={errors}
                required={shadowDisplay}
                rows={3}
              />
            </>
          )}
        </EditContainer>
      </form>
    </>
  );
};

export default CreateEditEventForm;
