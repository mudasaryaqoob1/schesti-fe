'use client';
import React, { useState } from 'react';
import Button from '@/app/component/customButton/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import FormControl from '@/app/component/formControl';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import PrimaryHeading from '@/app/component/headings/primary';
import Description from '@/app/component/description';
import { IResetPasswordInterface } from '@/app/interfaces/authInterfaces/resetPassword.interface';
import { resetPasswordHandler } from '@/redux/authSlices/auth.thunk';
import { toast } from 'react-toastify';

const initialValues: IResetPasswordInterface = {
  password: '',
  confirmPassword: '',
};

const newPasswordSchema: any = Yup.object({
  password: Yup.string()
    .matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/), "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.")
    .min(6, 'Minimum six character is required')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});
const SetNewPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: IResetPasswordInterface) => {
    setIsLoading(true);
    let result: any = await dispatch(
      resetPasswordHandler({ ...values, userId: userId })
    );
    if (result.payload.statusCode == 200) {
      setIsLoading(false);
      router.push('/login');
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
      <div className="h-full grid place-items-center">
        <div className="w-full max-w-md">
          <PrimaryHeading
            className="text-center"
            title="
            Set New Password 
            "
          />
          <Description
            className="mt-2 mb-10 font-normal leading-[24px] text-center"
            title="Please enter your new password"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={newPasswordSchema}
            onSubmit={submitHandler}
          >
            {({ handleSubmit }) => {
              return (
                <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                  <div className="flex flex-col gap-6">
                    <FormControl
                      control="password"
                      label="set new password"
                      type="password"
                      name="password"
                      placeholder="New password"
                    />
                    <FormControl
                      control="password"
                      label="Confirm password"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                    />
                  </div>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    text="Set Password"
                    className=" mt-8"
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

export default SetNewPassword;
