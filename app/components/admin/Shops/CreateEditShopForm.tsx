import React, { useEffect, useRef, useState } from 'react';
import EditContainer from '../EditSection/EditContainer';
import Input from '../Inputs/Input';
import TextArea from '../Inputs/TextArea';
import YesNoSwitch from '../Inputs/YesNoSwitch';
import HeaderBar from '../HeaderBar';
import Heading from '../../Typography/Heading';
import Button from '../ui/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageUpload, { deleteImgFromCloudinary } from '../ImageUpload';

interface CreateEditShopFormProps {
  title: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: any;
  secondaryButtonLabel?: string;
  isEdit?: boolean;
  currentId?: string;
}

const CreateEditShopForm = ({
  title,
  isLoading = false,
  onSubmit,
  defaultValues = {},
  secondaryButtonLabel = 'Cancel',
  isEdit = false,
}: CreateEditShopFormProps) => {
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

  const [saving, setSaving] = useState<boolean>(false);

  const resetImageRef = useRef<() => void>(null); // Create a ref for the resetImage function
  const resetForm = () => {
    reset(defaultValues); // Reset the form
    if (resetImageRef.current) {
      resetImageRef.current(); // This will delete the image if needed
    }
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const display = watch('display');
  const imageSrc = watch('imageSrc');

  const imageSrcRef = useRef(imageSrc);

  useEffect(() => {
    imageSrcRef.current = imageSrc;
  }, [imageSrc]);

  const btnShouldBeDisabled = isLoading;

  return (
    <>
      <HeaderBar>
        <Heading title={title} />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => router.push('/admin/collections/shops')}>
            {secondaryButtonLabel}
          </Button>
          {isEdit && (
            <Button className='ml-2' outline disabled={btnShouldBeDisabled} onClick={resetForm}>
              Reset
            </Button>
          )}
          <Button
            submit
            disabled={btnShouldBeDisabled}
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
            focus={!isEdit}
          />
          <ImageUpload
            label='Image'
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
            disabled={isLoading}
            isEdit={isEdit}
            saving={saving}
            resetImageRef={resetImageRef}
          />
          <Input
            id='url'
            label='Url'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          {/* <TextArea
            id='description'
            label='Description (optional)'
            disabled={isLoading}
            register={register}
            errors={errors}
            rows={5}
          /> */}
          <YesNoSwitch
            disabled={isLoading}
            value={display}
            label='Display?'
            onChange={(value) => setCustomValue('display', value)}
          />
        </EditContainer>
      </form>
    </>
  );
};

export default CreateEditShopForm;
