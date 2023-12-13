'use client';
import FormControl from '@/app/component/formControl';
import {
  bg_style,
  minHeading,
  senaryHeading,
} from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
// interface newClientTypes {
//   firstName: string
//   lastName: string
//   email: string
//   phoneNumber: string
//   companyName: string
//   address: string
//   address2?: string
// }
const initialValues = {
  companyName: '',
  email: '',
  industry: '',
  totalemployees: '',
  phoneNumber: '',
  website: '',
};

const newClientSchema: any = Yup.object({
  companyName: Yup.string().required('company Name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  industry: Yup.string().required('industry  is required!'),
  totalemployees: Yup.string().required(' totalemployees  is required!'),
  phoneNumber: Yup.string().required('phoneNumber  is required!'),
  website: Yup.string().required('Address is required!'),
});
const Index = () => {
  const submitHandler = (values: any, { resetForm }) => {};
  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={newClientSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit }) => {
          return (
            <Form
              name="basic"
              onSubmit={handleSubmit}
              autoComplete="off"
              className={`${bg_style} p-5 `}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-x-5 ">
                <FormControl
                  control="input"
                  label="Company Name"
                  labelStyle="!text-lightyGrayish"
                  type="text"
                  name="companyName"
                  placeholder="Enter Company Name"
                />
                <FormControl
                  control="input"
                  label="email"
                  type="email"
                  name="email"
                  labelStyle="!text-lightyGrayish"
                  placeholder="Email Address"
                />
                <FormControl
                  control="input"
                  label="industry"
                  type="text"
                  name="industry"
                  labelStyle="!text-lightyGrayish"
                  placeholder="industry"
                />
                <FormControl
                  control="input"
                  label="total empolyee"
                  type="text"
                  name="totalemployees"
                  labelStyle="!text-lightyGrayish"
                  placeholder="total empolyee"
                />
                <FormControl
                  control="input"
                  label="Phone Number"
                  type="text"
                  name="phoneNumber"
                  labelStyle="!text-lightyGrayish"
                  placeholder="Phone number"
                />
                <FormControl
                  control="input"
                  label="website"
                  type="text"
                  name="website"
                  labelStyle="!text-lightyGrayish"
                  placeholder="abc@company.com"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      {/* upload */}
      <div className={`${bg_style} p-5 mt-4 `}>
        <div
          className={`px-6 py-4 flex flex-col items-center gap-3
                ${bg_style}
                `}
        >
          <input type="text" id="upload" className="hidden" />
          <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
            <Image
              src={'/uploadcloud.svg'}
              alt="upload icon"
              width={20}
              height={20}
            />
          </div>
          <div className="flex gap-2">
            <label
              htmlFor="upload"
              className={twMerge(
                `${senaryHeading} text-RoyalPurple font-semibold 
                            cursor-pointer
                            `
              )}
            >
              Upload Logo
            </label>
            <input type="file" name="upload" id="upload" className="hidden" />
            <p
              className={`text-steelGray ${minHeading}
                        `}
            >
              or drag and drop
            </p>
          </div>
          <p
            className={`text-steelGray ${minHeading}
                        `}
          >
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4  mt-4 pb-2">
        <div className="">
          <Button
            text="Cancel"
            className={`!bg-snowWhite !text-[#344054] !py-3 !px-5 !w-28`}
          />
        </div>
        <div className="w-28">
          <Button text="Update " className="!py-3 !px-5" />
        </div>
      </div>
    </div>
  );
};

export default Index;
