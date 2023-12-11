'use client';
import FormControl from '@/app/component/formControl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import React from 'react';
import QuaternaryHeading from '@/app/component/headings/quaternary';
const initialValues = {
  projectName: '',
  leadSource: '',
  projectValue: '',
  phoneNumber: '',
};
const clientInfoSchema: any = Yup.object({
  projectName: Yup.string().required(' Project Value is required!'),
  leadSource: Yup.string().required('Lead Source is required!'),
  projectValue: Yup.string().required('Project Value is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
});
const ClientInfo = () => {
  const submitHandler = () => { };
  return (
    <div className="p-5 mt-4 border border-solid border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
      <QuaternaryHeading
        title="Client Information"
        className="font-semibold"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={clientInfoSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
              validateMessages={clientInfoSchema}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-x-5 ">
                <FormControl
                  control="input"
                  label="Client Name"
                  type="text"
                  name="clientName"
                  placeholder="Enter Client Name"
                />
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
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                />

                <FormControl
                  control="input"
                  label="email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ClientInfo;
