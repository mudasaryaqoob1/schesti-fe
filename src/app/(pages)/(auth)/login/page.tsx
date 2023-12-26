'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// module imports
import { AppDispatch } from '@/redux/store';

import FormControl from '@/app/component/formControl';
import { quinaryHeading, btnStyle } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { ILogInInterface } from '@/app/interfaces/authInterfaces/login.interface';
import { login, loginWithGoogle } from '@/redux/authSlices/auth.thunk';
import PrimaryHeading from '@/app/component/headings/primary';
import Description from '@/app/component/description';

const initialValues: ILogInInterface = {
  email: '',
  password: '',
  remember: false,
};

const LoginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Minimum six character is required'),
  remember: Yup.boolean().optional(),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  const submitHandler = async ({ email, password }: ILogInInterface) => {
    setLoading(true);
    let result: any = await dispatch(login({ email, password }));

    if (result.payload.statusCode == 200) {
      setLoading(false);
      if(result.payload.data.user.roles.includes('Company')){
        router.push('/clients');
      }
      else if(result.payload.data.user.roles.includes('Admin')){
        router.push('/admin/companies');
      }
    } else {
      setLoading(false);
      toast.error(result.payload.message);
    }
  };

  const googleAuthenticationHandler: any = useGoogleLogin({
    onSuccess: async (respose: any) => {
      try {
        const googleAuthResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        let responseObj = {
          email: googleAuthResponse.data.email,
          name: googleAuthResponse.data.name,
          avatar: googleAuthResponse.data.picture,
          providerId: googleAuthResponse.data.sub,
        };

        let result: any = await dispatch(loginWithGoogle(responseObj));

        if (result.payload.statusCode == 200) {
          // localStorage.setItem('schestiToken', result.payload.token);
          router.push(`/clients`);
        } else if (result.payload.statusCode == 400) {
          router.push(`/companydetails/${result.payload.data.user._id}`);
        }
      } catch (error) {
        console.log('Login Failed', error);
      }
    },
    onError: (error: any) => {
      console.log('Login Failed', error);
    },
  });

  return (
    <WelcomeWrapper>
      <React.Fragment>
        <Image
          className="cursor-pointer"
          src={'/logo.svg'}
          alt="logo website"
          width={100}
          height={30}
          onClick={() => router.push('/')}
        />
        <section className="grid place-items-center h-full">
          <div className="w-full max-w-md">
            <PrimaryHeading
              className="text-center"
              title=" Login to your account"
            />
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={submitHandler}
            >
              {({ handleSubmit }) => (
                <Form name="basic" autoComplete="off" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 mt-16">
                    <FormControl
                      control="input"
                      label="email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                    />
                    <FormControl
                      control="password"
                      label="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  {/* Remember me checkbox */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="">
                      <div className="flex gap-2 items-center">
                        <Field type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember" className={quinaryHeading}>
                          Remember me
                        </label>
                      </div>
                      <ErrorMessage
                        name="remember"
                        component="div"
                        className="text-red-700"
                      />
                    </div>
                    <Description
                      className="text-graphiteGray font-semibold cursor-pointer hover:underline"
                      title=" Forget Password?"
                      onClick={() => router.push('/forgetpassword')}
                    />
                  </div>
                  {/* Login button */}
                  <Button
                    isLoading={loading}
                    text="Login"
                    className="!p-3 mt-8"
                    type="submit"
                  />

                  {/* Divider */}
                  <div className="flex justify-between items-center self-stretch my-6">
                    <div className="w-[100%] h-[1px] bg-lightSteelGray"></div>
                    <span className={`${quinaryHeading} mx-4`}>Or</span>
                    <div className="w-[100%] h-[1px] bg-lightSteelGray"></div>
                  </div>

                  {/* Google sign-in button */}
                  <button
                    className={twMerge(
                      ` ${btnStyle} ${quinaryHeading}  font-semibold flex items-center justify-center gap-3 bg-snowWhite border-2 shadow-scenarySubdued border-doveGray`
                    )}
                    type="button"
                    onClick={googleAuthenticationHandler}
                  >
                    <Image
                      src={'/googleicon.svg'}
                      alt="google icon"
                      width={24}
                      height={24}
                      className="mr-1"
                    />
                    Signin with Google
                  </button>

                  {/* Sign up section */}
                  <div className=" flex gap-2 justify-center mt-10">
                    <Description
                      className="text-ebonyGray"
                      title="Don’t have an account?"
                    />
                    <p
                      className={twMerge(
                        `${quinaryHeading} font-bold cursor-pointer hover:underline`
                      )}
                      onClick={() => router.push('/register')}
                    >
                      Sign Up
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
            ;
          </div>
        </section>
      </React.Fragment>
    </WelcomeWrapper>
  );
};

export default Login;
