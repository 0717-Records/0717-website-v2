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
import { ClipLoader } from 'react-spinners';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

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
  const [slugIsValid, setSlugIsValid] = useState(false);
  const isInitial = useRef(true);
  const nameRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

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
    if (slug.length > 0) {
      setSlugLoading(true);
      const timer = setTimeout(() => {
        console.log('API call to check slug uniqueness:', slug);
        // Simulate API call
        setSlugLoading(false);
        setSlugIsValid(slug !== 'taken'); // Replace with actual API logic
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [slug]);

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isInitial.current && !isEdit) handleSlugChange(event);
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = cleanseSlug(event.target.value);
    if (newSlug !== slug) setSlug(newSlug);
  };

  const SlugFeedback = ({
    slugLoading,
    slugIsValid,
  }: {
    slugLoading: boolean;
    slugIsValid: boolean;
  }) => {
    if (slugLoading) return <ClipLoader color='#85a5fa' />;
    if (slugIsValid) return <FaCheck size={24} className='text-green-500' />;
    return (
      <div className='text-red-500 text-sm flex items-end'>
        <ImCross size={24} className='text-red-500 mr-4 ' />
        <p>Slug is already taken! Please adjust.</p>
      </div>
    );
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
            inputRef={nameRef}
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

            {slug.length > 0 && (
              <div className='ml-4 mb-8'>
                <SlugFeedback slugIsValid={slugIsValid} slugLoading={slugLoading} />
              </div>
            )}
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
