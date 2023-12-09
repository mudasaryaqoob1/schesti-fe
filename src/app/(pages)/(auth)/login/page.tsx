'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// module imports
import FormControl from '@/app/component/formControl';

// style imports
import { primaryHeading, quinaryHeading } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
// import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import NavBar from '@/app/component/navbar';
import { useRouter } from 'next/navigation';
import GoogleButton from '@/app/component/googleBtn';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { useLoginMutation } from '@/app/redux/authApi';
import { toast } from 'react-toastify';

export type LoginInfo = {
  email: string;
  password: string;
  remember?: boolean;
}
const initialValues: LoginInfo = {
  email: '',
  password: '',
  remember: false
};

const LoginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  password: Yup.string()
    .required('Invalid credentials. Please try again!')
    .min(6, 'Minimum six character is required'),
  remember: Yup.boolean().optional()
});

const Login = () => {
  const router = useRouter();
  const [loginHandler, { isLoading }] = useLoginMutation();
  const submitHandler = async ({ email, password }: LoginInfo) => {
    try {
      await loginHandler({ email, password }).unwrap();
      toast.success("login successfull");
      router.push('/');

    } catch (error) {
      const { data: { message } } = error as { data: { message: string } };
      toast.error(message);
    }
  };

  return (
    <WelcomeWrapper>
      <React.Fragment>
        <NavBar />
        <section className="grid place-items-center">
          <div className="flex flex-col w-full px-10">
            <Heading
              classes="self-center"
              styledVars={primaryHeading}
              title=" Login to your account"
            />
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={submitHandler}
            >
              {({ handleSubmit }) => (
                <Form
                  name="basic"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="mt-10">
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
                  <div className='flex justify-between items-center'>
                    <div className="">
                      <div className="flex gap-2 items-center">
                        <Field type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember" className={quinaryHeading}>
                          Remember me
                        </label>
                      </div>
                      <ErrorMessage name="remember" component="div" className='text-red-700' />
                    </div>
                    <Paragraph
                      styledVars={quinaryHeading}
                      classes="text-graphiteGray font-semibold cursor-pointer hover:underline"
                      title=" Forget Password?"
                      onClick={() => router.push('/forgetpassword')}
                    />
                  </div>
                  {/* Login button */}
                  <Button isLoading={isLoading} text="Login" className="!p-3 mt-8" type='submit' />

                  {/* Divider */}
                  <div className="flex justify-between items-center self-stretch my-6">
                    <div className="w-[100%] h-[1px] bg-lightSteelGray"></div>
                    <span className={quinaryHeading}>Or</span>
                    <div className="w-[100%] h-[1px] bg-lightSteelGray"></div>
                  </div>

                  {/* Google sign-in button */}
                  <GoogleButton text="Sign in" />

                  {/* Sign up section */}
                  <div className=" flex gap-2 justify-center mt-10">
                    <Paragraph
                      styledVars={quinaryHeading}
                      classes="text-ebonyGray"
                      title="Don’t have an account?"
                    />
                    <p
                      className={twMerge(`${quinaryHeading} font-bold cursor-pointer hover:underline`)}
                      onClick={() => router.push('/register')}
                    >
                      Sign Up
                    </p>
                  </div>
                </Form>
              )}
            </Formik>;
          </div>
        </section>
      </React.Fragment>
    </WelcomeWrapper >
  );
};

export default Login;
