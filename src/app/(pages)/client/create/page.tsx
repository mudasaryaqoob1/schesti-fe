'use client';
import FormControl from '@/app/component/formControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
import MinDesc from '@/app/component/description/minDesc';
import Image from 'next/image';
import { senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
export interface newClientTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  address2?: string;
}

const newClientSchema: any = Yup.object({
  firstName: Yup.string().required(' first name is required!'),
  lastName: Yup.string().required('last name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phoneNumber: Yup.string().required('phone number is required!'),
  companyName: Yup.string().required('company Name is required!'),
  address: Yup.string().required('Address is required!'),
  address2: Yup.string(),
});
const CreateClient = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    address: '',
    address2: '',
  };
  const router = useRouter();
  const submitHandler = () => {
    router.push('/client');
  };

  return (
    <>
      <section className="mx-16">
        <div className="flex gap-4 items-center my-6">
          <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />
          <p className={`${senaryHeading} font-base text-slateGray`}>
            My Client
          </p>
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />

          <MinDesc
            title="Add New Client"
            className={`${senaryHeading} font-semibold text-lavenderPurple cursor-pointer underline`}
          />
        </div>
        <div
          className="p-5 flex flex-col rounded-lg border
     border-silverGray shadow-secondaryShadow2 bg-white"
        >
          <TertiaryHeading
            className="text-graphiteGray"
            title="Add New Client"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={newClientSchema}
            onSubmit={submitHandler}
          >
            {({ handleSubmit }) => {
              return (
                <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                  <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-x-5">
                    <FormControl
                      control="input"
                      label="First Name"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <FormControl
                      control="input"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    <FormControl
                      control="input"
                      label="Phone Number"
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone number"
                    />
                    <FormControl
                      control="input"
                      label="email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                    />
                    <div className="md:col-span-full">
                      <FormControl
                        control="input"
                        label="Company Name"
                        type="text"
                        name="companyName"
                        placeholder="Enter Company Name"
                      />
                    </div>
                    <FormControl
                      control="input"
                      label="Address"
                      type="text"
                      name="address"
                      placeholder="Address"
                    />
                    <FormControl
                      control="input"
                      label="Address 2 (optional)"
                      type="text"
                      name="address2"
                      placeholder="Address 2"
                    />
                  </div>
                  <div className="self-end flex justify-end items-center gap-5 md:mt-4 my-3">
                    <div>
                      <CustomButton
                        className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                        text="Cancel"
                        onClick={() => router.push('/client')}
                      />
                    </div>
                    <div>
                      <CustomButton type="submit" text="Save and Continue" />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default CreateClient;
