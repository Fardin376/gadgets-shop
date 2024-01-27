'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import InputComponent from '../components/InputComponent/InputComponent';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useGlobalState } from '@/context/context';
import Notification from '../components/Notification';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

function LoginForm({ currentUser }: { currentUser: SafeUser | null }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
      router.refresh();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((res) => {
      setIsLoading(false);
      if (res?.error) {
        toast.error(res.error);
      } else {
        router.push('/');
        router.refresh();
        toast.success('Logged in successfully');
      }
    });
  };

  if (currentUser) {
    return (
      <p className="text-center font-semibold">
        Logged in. Redirecting....
      </p>
    );
  }

  return (
    <>
      <Heading title="Login" />
      <ButtonComponent
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <hr className="horizontal-line" />

      <InputComponent
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputComponent
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <ButtonComponent
        label={isLoading ? 'Loading' : 'Login'}
        onClick={handleSubmit(onSubmit)}
      />
      <p className={`registration-p`}>
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/register">
          Sign Up
        </Link>
      </p>
      <Notification />
    </>
  );
}
export default LoginForm;
