'use client';
import Button from '@/app/component/customButton/button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import Image from 'next/image';
// module imports
import FormControl from '@/app/component/formControl';
import { primaryHeading, quinaryHeading } from '@/globals/tailwindvariables';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import GoogleButton from '@/app/component/googleBtn';
import WelcomeWrapper from '@/app/component/welcomeLayout';
import { useSignupMutation } from '@/app/redux/authApi';
import { toast } from 'react-toastify';

export type SignupInfo = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
const initialValues: SignupInfo = {
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
    .required('Invalid credentials. Please try again!')
    .min(6, 'Minimum six character is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required!')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
  const router = useRouter();
  const [registerHandler, { isLoading }] = useSignupMutation();

  const submitHandler = async (values: SignupInfo) => {
    const { name, email, password } = values;
    try {
      await registerHandler({ name, email, password }).unwrap();
      toast.success('Register Successfull');
      router.push('/');
    } catch (error) {
      const {
        data: { message },
      } = error as { data: { message: string } };
      toast.error(message);
    }
    router.push('/checkmail');
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
          <Heading
            classes="text-center"
            styledVars={primaryHeading}
            title="
            Registration
            "
          />
          <Paragraph
            classes="my-2 text-center text-slateGray"
            styledVars={quinaryHeading}
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
                  <div className="flex flex-col gap-3 mt-4">
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
                  {/* <div className="flex justify-between align-items-center w-full">
                <div className='flex gap-2 items-center'>
                  <Image src={"/check.svg"} alt="check icon" width={14} height={14}
                   className="cursor-pointer"/>
                <p className={quinaryHeading} >
                  Remember me</p>
                </div>
                <Paragraph
                  styledVars={quinaryHeading}
                  classes='text-graphiteGray font-semibold cursor-pointer hover:underline'
                  title=" Forget Password?"
                />
              </div> */}
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
                    <Paragraph
                      styledVars={quinaryHeading}
                      classes="text-ebonyGray"
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
