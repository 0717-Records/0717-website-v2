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

interface CreateEditArtistFormProps {
  title: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: any;
  secondaryButtonLabel?: string;
  isEdit?: boolean;
}

const cleanseSlug = (input: string) => input.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

const CreateEditArtistForm = ({
  title,
  isLoading = false,
  onSubmit,
  defaultValues = {},
  secondaryButtonLabel = 'Cancel',
  isEdit = false,
}: CreateEditArtistFormProps) => {
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

  const [slug, setSlug] = useState('');
  const [slugLoading, setSlugLoading] = useState(false);
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

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isInitial.current && !isEdit) {
      const newSlug = cleanseSlug(event.target.value);
      setSlug(newSlug);
    }
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = cleanseSlug(event.target.value);
    setSlug(newSlug);
  };

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
              disabled={isLoading}
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
            onChange={handleArtistNameChange}
            onBlur={() => (isInitial.current = false)}
          />
          <div className='w-4/5 -mt-4'>
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

          <ImageUpload
            label='Image'
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
            disabled={isLoading}
            isEdit={isEdit}
            rounded
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
