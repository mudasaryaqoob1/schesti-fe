'use client';
import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import { bg_style } from '@/globals/tailwindvariables';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Dispatch, SetStateAction } from 'react';
import CustomWhiteButton from '@/app/component/customButton/white';
// import AddItemTable from '@/app/component/table/table';
// import { headings } from './data';
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
const Add = ({ setPrevNext }: Props) => {
  const submitHandler = () => { };
  return (
    <div>
      {/* scope */}
      {/*  */}
      <div className="flex justify-between items-center md:my-0 my-4">
        <TertiaryHeading
          title="Scope"
          className="text-graphiteGray font-semibold"
        />
        <div className="flex gap-3 items-center">
          <CustomWhiteButton
            text="Previous"
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
              <FormControl
                label="Scope of Work"
                control="select"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="md:w-[350px] mt-1.5"
              />
              <div className="bg-graylighty h-px w-full my-5"></div>

              <div className="md:flex block gap-2 flex-wrap">
                <FormControl
                  control="select"
                  type="text"
                  name="phoneNumber"
                  placeholder="Select the items"
                  className="md:w-[560px] w-full md:my-0 my-5"
                />
                <FormControl
                  control="select"
                  type="text"
                  name="officeNumber"
                  placeholder="Select unit"
                  className="2xl:w-[270px] md:w-[200px] w-full"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  mt="mt-0"
                  inputStyle="mt-0"
                />
                <FormControl
                  control="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  mt="mt-0"
                  inputStyle="mt-0"
                />
                <CustomWhiteButton
                  type="submit"
                  text="Add item"
                  className="self-start md:w-auto w-full md:my-0 mt-4 !bg-goldenrodYellow   !text-white
                        "
                />
              </div>
              <div className="self-end flex justify-end items-center gap-5 md:mt-5 mb-0 my-3">
                <div>
                  <CustomWhiteButton
                    className="mx-w-30"
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
      <div className={`${bg_style} p-5 mt-4`}>
        <div className="flex items-center gap-2">
          <QuaternaryHeading
            title="DIV-03 - Concrete "
            className="font-semibold"
          />
          <Description
            title="Concrete - Building"
            className="text-lg font-normal"
          />
        </div>
        {/* <AddItemTable headings={headings} /> */}
      </div>
    </div>
  );
};

export default Add;
