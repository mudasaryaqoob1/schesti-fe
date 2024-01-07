'use client';
import CustomButton from '@/app/component/customButton/button';
import CustomWhiteButton from '@/app/component/customButton/white';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
// import AddItemTable from '@/app/component/table/table';
// import { headings } from './data';
import { Dispatch, SetStateAction } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';
import { bg_style } from '@/globals/tailwindvariables';
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  additionalEmail: '',
  password: '',
  phoneNumber: '',
  officeNumber: '',
  address: '',
  address2: '',
};

const newClientSchema: any = Yup.object({
  firstName: Yup.string().required(' first name is required!'),
  lastName: Yup.string().required('last name is required!'),
  phoneNumber: Yup.string().required('phone number is required!'),
  officeNumber: Yup.string().required('office number is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  additionalEmail: Yup.string()
    .required('Additional Email is required!')
    .email('Additional Email should be valid'),
  address: Yup.string().required('Address is required!'),
  address2: Yup.string().required('Address 2 is required!'),
});
interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
}
const New = ({ setPrevNext }: Props) => {
  const submitHandler = () => { };
  return (
    <div>
      {/*  */}
      <div className="flex justify-between items-center">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="grid grid-rows-1 md:grid-cols-3 gap-x-2">
          <CustomButton
            text="View Plans"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                        border-2 border-solid !border-celestialGray "
          />
          <CustomButton
            text="Previous"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                        border-2 border-solid !border-celestialGray"
            onClick={() => setPrevNext((prev) => prev - 1)}
          />

          <CustomButton
            text="Next"
            className="!w-full"
            onClick={() => setPrevNext((prev) => prev + 1)}
          />
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={newClientSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              className={`mt-4 p-5 ${bg_style} `}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-x-2">
                <FormControl
                  control="select"
                  label="CSI Section"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="mt-1.5"
                />
                <FormControl
                  control="select"
                  label="Scope of Work"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="mt-1.5"
                />
              </div>
              <div className="bg-graylighty h-px w-full my-5"></div>

              <div className="md:flex block gap-2">
                <FormControl
                  control="select"
                  label=""
                  type="text"
                  name="phoneNumber"
                  placeholder="Select the items"
                  className="md:w-[559px] w-full md:my-0 my-2"
                />
                <FormControl
                  control="select"
                  label=""
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                  className="md:w-[250px] w-full md:my-0 my-2"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  mt="md:mt-0 mt-2"
                  className="md:w-[200px] w-full"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  mt="md:mt-0 mt-2"
                  className="md:w-[200px] w-full"
                />
                <CustomButton
                  type="submit"
                  text="Add item"
                  className="md:my-0 my-2 !text-snowWhite !bg-goldenrodYellow self-start !py-2 md:w-auto w-full
                        "
                />
              </div>
              {/* <AddItemTable headings={headings} /> */}
              <div className="self-end flex justify-end items-center gap-5 md:mt-5  my-3">
                <div>
                  <CustomWhiteButton
                    text="Cancel"
                  // onClick={() => router.push('/client')}
                  />
                </div>
                <div>
                  <CustomButton
                    className="mx-w-30"
                    type="submit"
                    text="Add Div"
                    icon="/plus.svg"
                    iconwidth={20}
                    iconheight={20}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default New;
