'use client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import FormControl from '@/app/component/formControl';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useDispatch } from 'react-redux';
// module imports

import NavBar from '@/app/component/navbar/authBar';
import Progessbar from '@/app/component/progressBar';
import PrimaryHeading from '@/app/component/headings/primary';
import Button from '@/app/component/customButton/button';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { AppDispatch } from '@/redux/store';
import { ICompanyDetailInterface } from '@/app/interfaces/addCompanyDetail.interface';
import { addCompanyDetail } from '@/redux/authSlices/auth.thunk';

const initialValues: ICompanyDetailInterface = {
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

  const submitHandler = async (values: ICompanyDetailInterface) => {
    let result = await dispatch(addCompanyDetail(values));
    console.log(result);

    router.push('/plans');
  };
  return (
    <>
      <NavBar login={true} />
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
