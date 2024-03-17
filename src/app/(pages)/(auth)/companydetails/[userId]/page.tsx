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
// import FormItemLabel from 'antd/es/form/FormItemLabel';

const initialValues: IRegisterCompany = {
  companyName: '',
  industry: '',
  employee: 1,
  phoneNumber: null,
};

const CompanyDetailsSchema: any = Yup.object({
  companyName: Yup.string().required('Company Name is required!'),
  industry: Yup.string().required('Industry Name is required!'),
  employee: Yup.number().required('Number of employee is required!'),
  phoneNumber: Yup.number().required('Phone Number of employee is required!'),
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
      router.push('/verification');
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
                        label="Phone Number"
                        type="number"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
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
                        min={1}
                      />
                      <label htmlFor="myInput">Logo/ Picture</label>
                      <div className="flex items-center">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-22 h-22 border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center p-5">
                            <svg
                              className="w-6 h-6 mb-3 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold text-purple-600">
                                Click to upload
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG (max. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
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
