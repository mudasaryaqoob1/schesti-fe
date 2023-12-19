'use client';
// module imports
import React, { useState } from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';

import CustomButton from '@/app/component/customButton/button';
import { minHeading, senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import MinDescription from '@/app/component/description/minDesc';
import CustomWhiteButton from '@/app/component/customButton/white';
import ModalComponent from '@/app/component/modal';
import FormControl from '@/app/component/formControl';
import { IEstimateRequest } from '@/app/interfaces/companyInterfaces/estimateRequests.interface';
import ExistingClient from '../existingClient';
import CustomNavbar from '@/app/component/customNavbar';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';

const clientInfoSchema: any = Yup.object({
  clientName: Yup.string().required('Client is required!'),
  companyName: Yup.string().required('Company name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string().required('Phone is required!'),
  city: Yup.string().required('City is required!'),
  projectName: Yup.string().required('Project name is required!'),
  leadSource: Yup.string().required('Load source is required!'),
  projectValue: Yup.string().required('Project value is required!'),
  projectInformation: Yup.string().required('Project info is required!'),
  salePerson: Yup.string().required('Sale person is required!'),
  estimator: Yup.string().required('Estimator is required!'),
});

const CreateEstimateRequest = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: IEstimateRequest = {
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    city: 'Lahore',
    projectName: '',
    leadSource: '',
    projectValue: '',
    projectInformation: '',
    salePerson: '',
    estimator: '',
  };

  const submitHandler = async (values: IEstimateRequest) => {
    let result = await estimateRequestService.httpAddNewEstimateRequest({
      ...values,
      phone: +values.phone,
    });
    if (result.statusCode == 201) {
      setIsLoading(false);
      router.push('/estimates');
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <CustomNavbar>
      <section className="my-5 px-16">
        <div className="flex justify-between flex-wrap items-center md:flex-nowrap">
          <TertiaryHeading title="Take Off Measurements" />
          <CustomWhiteButton
            text="Add Existing Client"
            className="!w-auto "
            icon="/plusblack.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => setShowModal(true)}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={clientInfoSchema}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, setFieldValue }) => {
            return (
              <>
                <ModalComponent open={showModal} setOpen={setShowModal}>
                  <ExistingClient
                    setModalOpen={setShowModal}
                    onSelectClient={({
                      firstName,
                      lastName,
                      companyName,
                      email,
                      phone,
                    }: IClient) => {
                      setFieldValue(
                        'clientName',
                        `${firstName} ${lastName}`
                      );
                      setFieldValue('companyName', companyName);
                      setFieldValue('email', email);
                      setFieldValue('phone', phone);
                    }}
                  />
                </ModalComponent>
                <Form onSubmit={handleSubmit}>
                  <div className="p-5 mt-4 border border-silverGray rounded-lg shadow-quinarGentleDepth">
                    <QuaternaryHeading
                      title="Client Information"
                      className="font-semibold"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-4 mt-4">
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
                        label="email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                      />
                      <FormControl
                        control="input"
                        label="Phone Number"
                        type="number"
                        name="phone"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="p-5 my-4 border border-silverGray rounded-lg shadow-quinarGentleDepth">
                    <QuaternaryHeading
                      title="Project information"
                      className="text-graphiteGray font-semibold"
                    />
                    <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 mt-4">
                      <FormControl
                        control="input"
                        label="Project Name"
                        type="text"
                        name="projectName"
                        placeholder="Enter Project Name"
                      />
                      <FormControl
                        control="input"
                        label="Lead Source Value"
                        type="text"
                        name="leadSource"
                        placeholder="Select source"
                      />
                      <FormControl
                        control="input"
                        label="Project Value"
                        type="text"
                        name="projectValue"
                        placeholder="Select source"
                      />
                      <FormControl
                        control="input"
                        label="Project Information"
                        type="text"
                        name="projectInformation"
                        placeholder="Enter Project Information"
                      />
                    </div>
                  </div>

                  {/* assignment */}
                  <div className="p-5 border-2 border-silverGray rounded-lg shadow-quinarGentleDepth">
                    <QuaternaryHeading
                      title="Assignments"
                      className="text-graphiteGray font-semibold"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-1 gap-5 w-full mt-4">
                      <FormControl
                        control="input"
                        label="Sale Person"
                        type="text"
                        name="salePerson"
                        placeholder="Enter sale person"
                      />
                      <FormControl
                        control="input"
                        label="Estimator"
                        type="text"
                        name="estimator"
                        placeholder="Select project manager"
                      />
                    </div>
                  </div>

                  <div className="p-5 mt-4 border-2  border-silverGray pb-4 rounded-lg shadow-quinarGentleDepth">
                    <QuaternaryHeading
                      title="Uploads"
                      className="text-graphiteGray font-semibold"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-60">
                        <p
                          className={`${senaryHeading} text-midnightBlue font-popin`}
                        >
                          Architecture
                        </p>
                        <div className="my-2 p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg ">
                          <Image
                            src={'/uploadcloud.svg'}
                            alt="upload icon"
                            width={20}
                            height={20}
                            className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                          />
                          <div className="flex gap-3 items-center">
                            <div>
                              <p
                                className={twMerge(
                                  `${senaryHeading} text-RoyalPurple font-semibold`
                                )}
                              >
                                Click to upload
                              </p>
                            </div>
                            <MinDescription
                              className="text-steelGray font-popin text-center"
                              title="or drag and drop"
                            />
                          </div>
                          <MinDescription
                            className="text-steelGray font-popin text-center"
                            title="SVG, PNG, JPG or GIF (max. 800x400px)"
                          />
                        </div>
                      </div>
                      <div className="w-60">
                        <p
                          className={`${senaryHeading} text-midnightBlue font-popin`}
                        >
                          Other Documents
                        </p>
                        <div className="p-4 my-2 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg ">
                          <Image
                            src={'/uploadcloud.svg'}
                            alt="upload icon"
                            width={20}
                            height={20}
                            className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                          />
                          <div className="flex gap-3 items-center">
                            <div>
                              <p
                                className={twMerge(
                                  `${senaryHeading} text-RoyalPurple font-semibold`
                                )}
                              >
                                Click to upload
                              </p>
                            </div>
                            <p
                              className={`${minHeading} text-midnightBlue font-popin`}
                            >
                              or drag and drop
                            </p>
                          </div>
                          <p
                            className={`${minHeading} text-midnightBlue font-popin text-center `}
                          >
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* buttons */}
                  <div className="flex justify-end items-center gap-2 md:mt-12 mt-6 p-4 bg-white shadow-secondaryTwist">
                    <div className='w-[116px]'>
                      <CustomButton
                        className="!border-celestialGray shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite !px-5 !py-3 w-full"
                        text="Cancel"
                        onClick={() => router.push('/estimates')}
                      />
                    </div>
                    <div className='w-[116px]'>
                      <CustomButton
                        text="Create"
                        type="submit"
                        isLoading={isLoading}
                        className="!px-5 !py-3 w-full"
                      />
                    </div>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </section>
    </CustomNavbar>
  );
};

export default CreateEstimateRequest;
