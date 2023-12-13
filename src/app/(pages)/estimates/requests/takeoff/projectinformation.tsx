'use client';

import FormControl from '@/app/component/formControl';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';

import QuaternaryHeading from '@/app/component/headings/quaternary';
const initialValues = {
  projectName: '',
  leadSource: '',
  projectValue: '',
  phoneNumber: '',
};
const projectInformationSchema: any = Yup.object({
  projectName: Yup.string().required(' Project Value is required!'),
  leadSource: Yup.string().required('Lead Source is required!'),
  projectValue: Yup.string().required('Project Value is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
});
const Projectinformation = () => {
  const submitHandler = () => {};

  return (
    <>
      <div className="p-5 my-4 border-2 border-silverGray  rounded-lg shadow-quinarGentleDepth">
        <QuaternaryHeading
          title="Project information "
          className="text-graphiteGray font-semibold"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={projectInformationSchema}
          onSubmit={submitHandler}
        >
          {(formik) => {
            return (
              <Form
                name="basic"
                onFinish={formik.handleSubmit}
                autoComplete="off"
                validateMessages={projectInformationSchema}
              >
                <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-x-5">
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
    </>
  );
};

export default Projectinformation;
