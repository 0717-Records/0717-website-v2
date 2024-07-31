import React, { useEffect, useRef, useState } from 'react';
import EditContainer from '../EditSection/EditContainer';
import Input from '../Inputs/Input';
import TextArea from '../Inputs/TextArea';
import YesNoSwitch from '../Inputs/YesNoSwitch';
import OptionSwitch from '../Inputs/OptionSwitch';
import LinkTable from '../LinkTable/LinkTable';
import HeaderBar from '../HeaderBar';
import Heading from '../../Typography/Heading';
import Button from '../ui/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageUpload, { deleteImgFromCloudinary } from '../ImageUpload';
import SlugFeedback from './SlugFeedback';
import axios from 'axios';
import { SlugStates } from './SlugFeedback';

interface CreateEditArtistFormProps {
  title: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: any;
  secondaryButtonLabel?: string;
  isEdit?: boolean;
  currentId?: string;
}

const cleanseSlug = (input: string) => input.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

const CreateEditArtistForm = ({
  title,
  isLoading = false,
  onSubmit,
  defaultValues = {},
  secondaryButtonLabel = 'Cancel',
  isEdit = false,
  currentId,
}: CreateEditArtistFormProps) => {
  const router = useRouter();
  const {
    register,
    setFocus,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const [slug, setSlug] = useState<string>(defaultValues.slug || '');
  const [slugState, setSlugState] = useState(SlugStates.IDLE);
  const isInitial = useRef(true);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const display = watch('display');
  const type = watch('type');
  const links = watch('links');
  const imageSrc = watch('imageSrc');

  const isMounted = useRef(false);
  const deleteOnUnmount = useRef(true);
  const imageSrcRef = useRef(imageSrc);

  useEffect(() => {
    imageSrcRef.current = imageSrc;
  }, [imageSrc]);

  // Delete orphaned image on cloudinary if it exists upon unmount
  // (i.e if we selected an image but are exiting without saving)
  useEffect(() => {
    return () => {
      if (isMounted.current && deleteOnUnmount.current) {
        if (imageSrcRef.current && imageSrcRef.current !== defaultValues.imageSrc) {
          deleteImgFromCloudinary({ url: imageSrcRef.current });
        }
      }
      isMounted.current = true;
    };
  }, []);

  // Check if slug is valid
  useEffect(() => {
    const checkSlug = async (slug: string, currentId?: string) => {
      try {
        const result = await axios.post('/api/check-slug', { slug, currentId });
        if (!result.data.exists) setSlugState(SlugStates.VALID);
        if (result.data.exists) setSlugState(SlugStates.INVALID);
      } catch (error: any) {
        setSlugState(SlugStates.ERROR);
      }
    };

    if (slug === '') setSlugState(SlugStates.IDLE);

    if (slug !== '') {
      setSlugState(SlugStates.LOADING);
      const timer = setTimeout(() => {
        checkSlug(slug, currentId);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isInitial.current && !isEdit) handleSlugChange(event);
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = cleanseSlug(event.target.value);
    if (newSlug !== slug) {
      setSlug(newSlug);
      setValue('slug', newSlug, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const btnShouldBeDisabled = isLoading || slugState !== SlugStates.VALID;

  return (
    <>
      <HeaderBar>
        <Heading title={title} />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => router.push('/admin/collections/artists')}>
            {secondaryButtonLabel}
          </Button>
          {isEdit && (
            <Button
              className='ml-2'
              outline
              disabled={btnShouldBeDisabled}
              onClick={() => {
                if (imageSrcRef.current && imageSrcRef.current !== defaultValues.imageSrc) {
                  deleteImgFromCloudinary({ url: imageSrcRef.current });
                }
                reset(defaultValues);
              }}>
              Reset
            </Button>
          )}
          <Button
            submit
            disabled={btnShouldBeDisabled}
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
            setFocus={setFocus}
            errors={errors}
            required
            onChange={handleArtistNameChange}
            onBlur={() => (isInitial.current = false)}
            focus={!isEdit}
          />
          <div className='-mt-4 flex items-end'>
            <div className='w-3/5'>
              <Input
                id='slug'
                label='Slug'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                onChange={handleSlugChange}
                overWriteValue={slug}
              />
            </div>
            <SlugFeedback slugState={slugState} />
          </div>

          <ImageUpload
            label='Image'
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
            disabled={isLoading}
            isEdit={isEdit}
            shape='rounded'
          />

          <TextArea
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            rows={5}
          />
          <YesNoSwitch
            disabled={isLoading}
            value={display}
            label='Display?'
            onChange={(value) => setCustomValue('display', value)}
          />
          <OptionSwitch
            disabled={isLoading}
            label='Type'
            value={type}
            options={['engage', 'explore', 'both']}
            labels={['Favourite (Engage)', 'Collaboration (Explore)', 'Both']}
            onChange={(value) => setCustomValue('type', value)}
          />
        </EditContainer>
        <EditContainer heading='Artist Links'>
          <LinkTable
            links={links}
            onUpdateLinks={(value) => setCustomValue('links', value)}
            disabled={isLoading}
          />
        </EditContainer>
      </form>
    </>
  );
};

export default CreateEditArtistForm;
