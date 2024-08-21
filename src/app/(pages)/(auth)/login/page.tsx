'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

// module imports
import { AppDispatch } from '@/redux/store';

import FormControl from '@/app/component/formControl';
import { btnStyle, quinaryHeading } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { ILogInInterface } from '@/app/interfaces/authInterfaces/login.interface';
import { login, loginWithGoogle } from '@/redux/authSlices/auth.thunk';
import PrimaryHeading from '@/app/component/headings/primary';
import Description from '@/app/component/description';
import { USER_ROLES_ENUM } from '@/app/constants/constant';
import UserRoleModal from '../userRolesModal';
import { CheckOtherRoles, navigateUserWhileAuth } from '@/app/utils/auth.utils';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { authService } from '@/app/services/auth.service';
import { IUserInterface } from '@/app/interfaces/user.interface';
import { getRouteFromPermission } from '@/app/utils/plans.utils';
import { Checkbox, ConfigProvider } from 'antd';

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
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [userRoleModal, setUserRoleModal] = useState(false);
  const [userDetail, setUserDetail] = useState<any>([]);
  let userRoles = [
    {
      role: USER_ROLES_ENUM.OWNER,
      desc: 'It is a long established fact that a reader will be distracted by the readable content of',
    },
    {
      role: USER_ROLES_ENUM.CONTRACTOR,
      desc: 'It is a long established fact that a reader will be distracted by the readable content of',
    },
    {
      role: USER_ROLES_ENUM.SUBCONTRACTOR,
      desc: 'It is a long established fact that a reader will be distracted by the readable content of',
    },
  ];

  const submitHandler = async ({ email, password }: ILogInInterface) => {
    setLoading(true);

    let result: any = await dispatch(login({ email, password }));

    if (result.payload.statusCode == 200) {
      setLoading(false);
      if (
        CheckOtherRoles(result.payload.data?.user.userRole) &&
        (result.payload.data.user?.userRole === USER_ROLES_ENUM.PROFESSOR ||
          result.payload.data.user?.userRole === USER_ROLES_ENUM.STUDENT) &&
        result.payload.data.user?.isActive === 'pending'
      ) {
        const responseLink = navigateUserWhileAuth(result.payload.data.user);
        if (responseLink) {
          router.push(responseLink);
          return;
        } else {
          toast.warning('You are not allowed to login. ');
        }
      } else if (
        CheckOtherRoles(result.payload.data?.user.userRole) &&
        result.payload.data.user?.isPaymentConfirm
      ) {
        const session = result.payload?.token;
        localStorage.setItem('schestiToken', session);
        let authUser = result.payload.data?.user as IUserInterface;
        if (authUser.associatedCompany) {
          // employee logging in
          const permissions = authUser.roles
            ? authUser.roles
                .map((item) =>
                  typeof item !== 'string' ? item.permissions : []
                )
                .flat()
            : [];
          if (permissions.length > 0) {
            const permission = permissions[0];
            const route = getRouteFromPermission(permission);
            if (route) {
              router.push(route.toString());
              return;
            }
          } else {
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
        return;
      }
      const responseLink = navigateUserWhileAuth(result.payload.data.user);

      if (responseLink) {
        router.push(responseLink);
        return;
      } else {
        toast.warning('You are not allowed to login. ');
      }
    } else {
      setLoading(false);
      // if statusCode === 400 and email is not verified then redirect to checkmail page
      const emailVerificationMessage = 'Verify from your email';
      if (
        result.payload.statusCode === 400 &&
        result.payload.message.includes(emailVerificationMessage)
      ) {
        router.push(`/checkmail?email=${email}`);
        return;
      } else {
        toast.error(result.payload.message);
      }
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

        const checkUserExist: any =
          await authService.httpSocialAuthUserVerification({
            email: googleAuthResponse.data.email,
          });
        if (checkUserExist.statusCode == 200) {
          let result: any = await dispatch(
            loginWithGoogle({
              ...responseObj,
              userRole: checkUserExist?.data?.user?.userRole,
            })
          );
          localStorage.setItem('schestiToken', result.token);
          router.push(`/dashboard`);
        } else if (
          checkUserExist.statusCode == 400 &&
          checkUserExist.message ===
            'Verify from your email and complete your profile'
        ) {
          router.push(`/companydetails/${checkUserExist.data.user._id}`);
        } else if (
          checkUserExist.statusCode == 400 &&
          checkUserExist.message === "Payment method doesn't exist"
        ) {
          localStorage.setItem('schestiToken', checkUserExist.token);
          router.push('/plans');
        } else {
          setUserRoleModal(true);
          setUserDetail(responseObj);
        }
      } catch (error) {
        console.log('Login Failed', error);
      }
    },
    onError: (error: any) => {
      console.log('Login Failed', error);
    },
  });

  const userRoleSelectionHandler = async (role: string) => {
    setLoading(true);
    let result: any = await dispatch(
      loginWithGoogle({ ...userDetail, userRole: role })
    );
    setUserRoleModal(false);
    setLoading(false);
    if (result.payload.statusCode == 200) {
      localStorage.setItem('schestiToken', result.payload.token);
      // router.push(`/clients`);
      router.push(`/dashboard`);
    } else if (result.payload.statusCode == 400) {
      router.push(`/companydetails/${result.payload.data.user._id}`);
    }
  };

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
              {({ handleSubmit, handleChange, values }) => (
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
                      <ConfigProvider
                        theme={{
                          components: {
                            Checkbox: {
                              colorPrimary: '#FFC107',
                              colorPrimaryHover: '#FFC107',
                              colorBorder: '#FFC107',
                            },
                          },
                        }}
                      >
                        <Checkbox
                          className={`${quinaryHeading}}`}
                          name="remember"
                          id="remember"
                          onChange={handleChange}
                          value={values.remember}
                        >
                          Remember me
                        </Checkbox>
                      </ConfigProvider>
                      {/* <div className="flex gap-2 items-center">
                        <Field type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember" className={quinaryHeading}>
                          Remember me
                        </label>
                      </div> */}
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
          </div>
        </section>
      </React.Fragment>
      <UserRoleModal
        viewUserRoleModal={userRoleModal}
        setViewUserRoleModal={setUserRoleModal}
        userRoles={userRoles}
        userRoleSelectionHandler={userRoleSelectionHandler}
      />
    </WelcomeWrapper>
  );
};

export default Login;
