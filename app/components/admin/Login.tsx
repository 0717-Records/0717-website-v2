'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (callback?.ok) {
        router.refresh();
        return;
      }

      if (callback?.error) {
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-4'>
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}>
        Login
      </button>
    </form>
  );
};

export default Login;
