'use client';
import React, { useState } from 'react';
import Button from '@/app/component/customButton/button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import FormControl from '@/app/component/formControl';
import { quinaryHeading } from '@/globals/tailwindvariables';
import GoogleButton from '@/app/component/googleBtn';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { ISignUpInterface } from '@/app/interfaces/authInterfaces/signup.interface';
import PrimaryHeading from '@/app/component/headings/primary';
import Description from '@/app/component/description';
import { signup } from '@/redux/authSlices/auth.thunk';
import { AppDispatch } from '@/redux/store';

const initialValues: ISignUpInterface = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterSchema: any = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Minimum six character is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required!')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: ISignUpInterface) => {
    setIsLoading(true);
    let result: any = await dispatch(signup(values));

    if (result.payload.status == 201) {
      setIsLoading(false);
      router.push(`/checkmail?email=${values.email}`);
    } else {
      setIsLoading(false);
      toast.error(result.payload.message);
    }
  };
  return (
    <WelcomeWrapper>
      <Image
        className="cursor-pointer"
        src={'/logo.svg'}
        alt="logo website"
        width={100}
        height={30}
        onClick={() => router.push('/')}
      />
      <section className=" grid place-items-center h-full">
        <div className="w-full max-w-md">
          <PrimaryHeading
            className="text-center"
            title="
            Registration
            "
          />
          <Description
            className="my-2 text-center text-slateGray"
            title=" Sign up to your account"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={submitHandler}
          >
            {(formik: any) => {
              return (
                <Form
                  name="basic"
                  onFinish={formik.handleSubmit}
                  autoComplete="off"
                >
                  <div className="flex flex-col gap-3">
                    <FormControl
                      control="input"
                      label="Name"
                      type="text"
                      name="name"
                      placeholder="Email your Name"
                    />
                    <FormControl
                      control="input"
                      label="email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                    />
                    <FormControl
                      control="password"
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <FormControl
                      control="password"
                      label="Confirm password"
                      type="password"
                      name="confirmPassword"
                      placeholder="confirm Password"
                    />
                  </div>

                  <Button
                    text="Register"
                    className="!p-[12px] mt-4"
                    type="submit"
                    isLoading={isLoading}
                  />
                  <div
                    className="flex justify-between items-center gap-[17px]
               self-stretch my-6"
                  >
                    <div className="w-[100%] h-[1px] bg-lightSteelGray"></div>
                    <span className={quinaryHeading}>Or</span>
                    <div className="w-[100%] h-[1px] bg-lightSteelGray"></div>
                  </div>
                  <GoogleButton text="Sign up" />
                  <div className=" flex gap-2  justify-center mt-4">
                    <Description
                      className="text-ebonyGray"
                      title=" Already have an account?"
                    />
                    <p
                      onClick={() => router.push('/login')}
                      className={twMerge(`${quinaryHeading} font-[700]
                   cursor-pointer hover:underline`)}
                    >
                      Sign In
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </WelcomeWrapper>
  );
};

export default Register;
