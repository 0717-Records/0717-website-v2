import React from 'react';
import EditContainer from '../EditSection/EditContainer';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import YesNoSwitch from '../inputs/YesNoSwitch';
import OptionSwitch from '../inputs/OptionSwitch';
import LinkTable from '../LinkTable/LinkTable';
import HeaderBar from '../HeaderBar';
import Heading from '../typography/Heading';
import Button from '../ui/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageUpload from '../ImageUpload';

interface CreateEditArtistFormProps {
  title: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: any;
  secondaryButtonLabel?: string;
}

const CreateEditArtistForm = ({
  title,
  isLoading = false,
  onSubmit,
  defaultValues = {},
  secondaryButtonLabel = 'Cancel',
}: CreateEditArtistFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const display = watch('display');
  const type = watch('type');
  const links = watch('links');
  const imageSrc = watch('imageSrc');

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
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}>
            Save
          </Button>
        </div>
      </HeaderBar>
      <form>
        <EditContainer>
          <div className='flex'>
            <div className='basis-2/3 pr-6'>
              <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
            <div className='flex flex-col gap-8'>
              <ImageUpload
                onChange={(value) => setCustomValue('imageSrc', value)}
                value={imageSrc}
              />
            </div>
          </div>

          <TextArea
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            rows={5}
          />
          <YesNoSwitch
            disabled={isLoading}
            value={display}
            label='Display?'
            onChange={(value) => setCustomValue('display', value)}
          />
          <div className='mt-6'>
            <OptionSwitch
              disabled={isLoading}
              label='Type'
              value={type}
              options={['engage', 'explore', 'both']}
              labels={['Favourite (Engage)', 'Collaboration (Explore)', 'Both']}
              onChange={(value) => setCustomValue('type', value)}
            />
          </div>
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
