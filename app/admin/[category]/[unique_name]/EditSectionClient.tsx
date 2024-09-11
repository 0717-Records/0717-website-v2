'use client';

import Button from '@/app/components/admin/ui/Button';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { SectionData } from '@/app/types';
import EditComponent from '@/app/components/admin/EditSection/EditComponent';
import updateSectionHandler from '@/app/dispatchers/updateSectionHandler';
import HeaderBar from '@/app/components/admin/HeaderBar';
import EditContainer from '@/app/components/admin/EditSection/EditContainer';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '@/app/components/Typography/Heading';

const EditSectionClient = (section: SectionData) => {
  const { id, title, components } = section;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();

  const fieldArr = components.flatMap((component) => component.fields);

  const defaultValues = fieldArr.reduce((acc, item) => {
    acc[item.id] = item.value;
    return acc;
  }, {} as Record<string, any>);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  console.log('DEFAULT VALUES: ', defaultValues['66915766f8577f16b87f36a8']);

  const resetImageRef = useRef<() => void>(null); // Create a ref for the resetImage function
  const resetForm = () => {
    reset(defaultValues); // Reset the form
    console.log('resetFunc: ', resetImageRef.current);
    if (resetImageRef.current) {
      console.log('Yep current is true');
      resetImageRef.current(); // This will delete the image if needed
    }
  };

  const updateSection: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateSectionHandler({ id, data, fieldArr });
      console.log('reset data...');
      reset(data);
      toast.success('Content saved!');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message =
        message !== '' ? message : 'Cannot update content right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
      setSaving(false);
    }
  };

  return (
    <>
      <HeaderBar>
        <Heading title={title || ''} />
        <div className='mb-2'>
          <Button outline disabled={isLoading} onClick={resetForm}>
            Reset
          </Button>
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={(e) => {
              e.preventDefault();
              setSaving(true);
              handleSubmit(updateSection)(e);
            }}>
            Save
          </Button>
        </div>
      </HeaderBar>

      <form>
        {components.map((component) => (
          <EditContainer key={component.id} heading={component.name}>
            <EditComponent
              component={component}
              isLoading={isLoading}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              saving={saving}
              resetImageRef={resetImageRef}
            />
          </EditContainer>
        ))}
      </form>
    </>
  );
};

export default EditSectionClient;
