'use client';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import Image from 'next/image';
// module imports
import FormControl from '@/app/component/formControl';
// style imports
import { primaryHeading, quinaryHeading } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
const initialValues = {
  name: '',
};

const LoginSchema: any = Yup.object({
  name: Yup.string().required('Email is required!').email('Invalid email!'),
});

const Forget = () => {
  const router = useRouter();

  const submitHandler = () => {
    router.push('/sendcode');
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
      <div className="h-full grid place-items-center">
        <div className="w-full max-w-md ">
          <Heading
            styledVars={primaryHeading}
            title="Forget Password"
            classes="text-center"
          />
          <Paragraph
            styledVars={quinaryHeading}
            classes="text-center mt-2 mb-10 font-normal leading-[24px] text-slateGray"
            title="Enter the email address associated with your account and we'll send
            you a link to reset your password"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={submitHandler}
          >
            {(formik: any) => {
              return (
                <Form
                  name="basic"
                  onFinish={formik.handleSubmit}
                  autoComplete="off"
                  validateMessages={LoginSchema}
                >
                  <div className="mt-10">
                    <FormControl
                      control="input"
                      label="Email"
                      type="email"
                      name="name"
                      placeholder="Enter your email"
                    />
                  </div>
                  <Button
                    text="Verify Email"
                    className="!p-[12px] mt-10"
                    type="submit"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </WelcomeWrapper>
  );
};

export default Forget;
