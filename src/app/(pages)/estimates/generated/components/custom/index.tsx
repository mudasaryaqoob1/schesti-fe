'use client';
import CustomWhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import AddItemTable from '@/app/component/table/table';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { headings } from './data';
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
import { Dispatch, SetStateAction } from 'react';
import { bg_style } from '@/globals/tailwindvariables';
interface Props {
  setPrevNext: Dispatch<SetStateAction<number>>;
}
const Custom = ({ setPrevNext }: Props) => {
  const submitHandler = () => {};
  return (
    <div>
      {/*  */}
      <div className="flex justify-between items-center mb-3">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="grid grid-rows-1 md:grid-cols-3 gap-x-2">
          <CustomButton
            text="views plans"
            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
                    border-2 border-solid !border-celestialGray "
          />
          <CustomButton
            text="previous"
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
              className={`p-5 ${bg_style} mt-4`}
            >
              <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-3 mb-3 gap-2">
                <FormControl
                  control="select"
                  label="CSI Section"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full"
                />
                <FormControl
                  control="select"
                  label="Scope of Work"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full"
                />
                <FormControl
                  control="select"
                  label="Scope of Work"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full"
                />
              </div>
              <div className="bg-graylighty h-px w-full my-5"></div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-x-2 ">
                <div className="md:col-start-1 md:col-end-3">
                  <FormControl
                    control="input"
                    type="text"
                    name="phoneNumber"
                    placeholder="Select the items"
                    mt="mt-0"
                  />
                </div>
                <FormControl
                  control="input"
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                  mt="mt-0"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                  mt="mt-0"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                  mt="mt-0"
                />
              </div>
              <div className="grid grid-cols-1  grid-rows-1 md:grid-cols-7 gap-x-2 grid-y-5">
                {/* div close */}
                <FormControl
                  control="input"
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <CustomWhiteButton
                  type="submit"
                  text="Add item"
                  className="self-end md:w-auto w-full md:my-0 mt-4 !bg-goldenrodYellow  !text-white
                        "
                />
              </div>

              <div className="self-end flex justify-end items-center gap-5 md:mt-5 mb-0 my-3">
                <div>
                  <CustomButton
                    className=" !border-celestialGray 
                        !py-2
                        !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                    text="Cancel"
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
      <AddItemTable headings={headings} />
    </div>
  );
};

export default Custom;
