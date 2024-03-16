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
import { btnStyle, quinaryHeading } from '@/globals/tailwindvariables';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { ISignUpInterface } from '@/app/interfaces/authInterfaces/signup.interface';
import PrimaryHeading from '@/app/component/headings/primary';
import Description from '@/app/component/description';
import { signup, loginWithGoogle } from '@/redux/authSlices/auth.thunk';
import { AppDispatch } from '@/redux/store';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { USER_ROLES_ENUM } from '@/app/constants/constant';

const initialValues: ISignUpInterface = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  userRole: ''
};

const RegisterSchema: any = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  password: Yup.string()
    .matches(
      new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.'
    )
    .min(6, 'Minimum six character is required')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required!')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState(USER_ROLES_ENUM.CONTRACTOR);
  const handleRoleChange = (value: string) => {
    setRole(value);
  };

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
          <div className="flex items-center justify-between space-x-4 bg-gray-200 rounded-md p-2 mt-6 mb-3">
            <button className={`toggle-btn block p-2 text-center rounded-md cursor-pointer ${role === USER_ROLES_ENUM.CONTRACTOR ? 'bg-lavenderPurple text-white' : 'bg-gray-200'}`} onClick={() => handleRoleChange(USER_ROLES_ENUM.CONTRACTOR)}>General-Contractor</button>
            <button className={`toggle-btn block p-2 text-center rounded-md cursor-pointer ${role === USER_ROLES_ENUM.SUBCONTRACTOR ? 'bg-lavenderPurple text-white' : 'bg-gray-200'}`} onClick={() => handleRoleChange(USER_ROLES_ENUM.SUBCONTRACTOR)}>Sub-Contractor</button>
            <button className={`toggle-btn block p-2 text-center rounded-md cursor-pointer ${role === USER_ROLES_ENUM.OWNER ? 'bg-lavenderPurple text-white' : 'bg-gray-200'}`} onClick={() => handleRoleChange(USER_ROLES_ENUM.OWNER)}>Owner</button>
          </div>


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
                  {/* <GoogleButton text="Sign up" /> */}
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
