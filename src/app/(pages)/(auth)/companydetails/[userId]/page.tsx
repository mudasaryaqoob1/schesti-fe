'use client';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import FormControl from '@/app/component/formControl';
import { useParams, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import Progessbar from '@/app/component/progressBar';
import PrimaryHeading from '@/app/component/headings/primary';
import Button from '@/app/component/customButton/button';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { AppDispatch } from '@/redux/store';
import { IRegisterCompany } from '@/app/interfaces/companyInterfaces/companyRegister.interface';
import { addCompanyDetail } from '@/redux/authSlices/auth.thunk';
import AuthNavbar from '@/app/(pages)/(auth)/authNavbar';

const initialValues: IRegisterCompany = {
  companyName: '',
  industry: '',
  employee: 1,
};

const CompanyDetailsSchema: any = Yup.object({
  companyName: Yup.string().required('Company Name is required!'),
  industry: Yup.string().required('Industry Name is required!'),
  employee: Yup.number().required('Number of employee is required!'),
});

const CompanyDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: IRegisterCompany) => {
    setIsLoading(true);
    let result: any = await dispatch(
      addCompanyDetail({ ...values, userId: userId })
    );

    if (result.payload.statusCode == 200) {
      setIsLoading(false);
      // localStorage.setItem('schestiToken', result.payload.token);
      router.push('/plans');
    } else {
      setIsLoading(false);
      toast.error(result.payload.message);
    }
  };
  return (
    <>
      <AuthNavbar />
      <div className="h-[calc(100vh-100px)] grid place-items-center">
        <div className="w-full max-w-xl bg-snowWhite">
          <h2 className={twMerge(`${tertiaryHeading} mb-4 `)}>
            Setup Company profile
          </h2>
          <div className="w-full h-1 bg-mistyWhite"></div>
          <div className="mt-6 bg-snowWhite shadow-tertiaryMystery p-10">
            <PrimaryHeading
              title="Company Details"
              className="text-center mb-12"
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
                    <div className="flex flex-col gap-6">
                      <FormControl
                        control="input"
                        label="Company Name"
                        type="text"
                        name="companyName"
                        placeholder="Enter Company Name"
                      />
                      <FormControl
                        control="input"
                        label="Industry"
                        type="select"
                        name="industry"
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
                      isLoading={isLoading}
                      text="Submit"
                      className="w-full my-3"
                      type="submit"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <Progessbar progress={'25%'} step={1} className="my-3" />
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
