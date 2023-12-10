'use client';
import Button from '@/app/component/customButton/button';
import { tertiaryHeading } from '@/globals/tailwindvariables';
// import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import FormControl from '@/app/component/formControl';

import { twMerge } from 'tailwind-merge';
import NavBar from '@/app/component/navbar/authBar';
import { useRouter } from 'next/navigation';
import Progessbar from '@/app/component/progressBar';
import PrimaryHeading from '@/app/component/headings/primary';
const initialValues = {
  CompanyName: '',
  industryName: '',
  employee: undefined,
};

const CompanyDetailsSchema: any = Yup.object({
  CompanyName: Yup.string().required('Company Name is required!'),
  industryName: Yup.string().required('industry Name is required!'),
  employee: Yup.number().required('no. employee is required!'),
});

const CompanyDetails = () => {
  const router = useRouter();
  const submitHandler = () => {
    router.push('/plans');
  };
  return (
    <>
      <NavBar login={true} />
      <div className="h-[100vh] grid place-items-center">
        {/* content center */}
        {/*  */}
        <div
          className="min-w-[537px] max-w-[300px] bg-snowWhite 
      mt-4
      rounded-2xl "
        >
          <h2 className={twMerge(`${tertiaryHeading} mb-4 `)}>
            Setup Company profile
          </h2>
          <div className="w-full h-1 bg-mistyWhite"></div>
          {/* start */}
          <div
            className="mt-6
        min-w-[537px] max-w-[300px] bg-snowWhite rounded-2xl 
        flex flex-col 
        shadow-tertiaryMystery p-10"
          >
            {/* // logo */}
            <PrimaryHeading
              title="Company Details"
              className="text-center"
            />
            <Formik
              initialValues={initialValues}
              validationSchema={CompanyDetailsSchema}
              onSubmit={submitHandler}
            >
              {(formik: any) => {
                return (
                  <Form
                    name="basic"
                    onFinish={formik.handleSubmit}
                    autoComplete="off"
                  // validateMessages={formik.handleSubmit}
                  >
                    <div className="mt-10">
                      <FormControl
                        control="input"
                        label="Company Name"
                        type="text"
                        name="CompanyName"
                        placeholder="Enter Company Name"
                      />
                      <FormControl
                        control="input"
                        label="Industry"
                        type="select"
                        name="industryName"
                        placeholder="Enter industry Name"
                      />
                      <FormControl
                        control="input"
                        label="Total Employee"
                        type="number"
                        name="employee"
                        placeholder="Employee"
                      />
                    </div>
                    <Button
                      text="Submit"
                      className="w-full my-3"
                      type="submit"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          {/* end */}
          <Progessbar progress={'25%'} step={1} className="my-3" />
        </div>
        {/* content end */}
      </div>
    </>
  );
};

export default CompanyDetails;
