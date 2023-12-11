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
const assignmentsSchema: any = Yup.object({
  projectName: Yup.string().required(' Project Value is required!'),
  leadSource: Yup.string().required('Lead Source is required!'),
  projectValue: Yup.string().required('Project Value is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
});
const Assignments = () => {
  const submitHandler = () => { };

  return (
    <>
      <div className="p-5  border-2 border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
        <QuaternaryHeading
          title="Assignments"
          className="text-graphiteGray font-semibold"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={assignmentsSchema}
          onSubmit={submitHandler}
        >
          {(formik) => {
            return (
              <Form
                name="basic"
                onFinish={formik.handleSubmit}
                autoComplete="off"
                validateMessages={assignmentsSchema}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-1 gap-x-5 w-full">
                  <FormControl
                    control="input"
                    label="Project Name"
                    type="text"
                    name="clientName"
                    placeholder="Enter Project Name"
                  />
                  <FormControl
                    control="input"
                    label="Project Value"
                    type="text"
                    name="companyName"
                    placeholder="Select source"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Assignments;
