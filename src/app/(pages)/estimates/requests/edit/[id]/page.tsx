'use client';
// modules import
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import * as Yup from 'yup';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import CustomButton from '@/app/component/customButton/button';
import { minHeading, senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import MinDescription from '@/app/component/description/minDesc';
import CustomWhiteButton from '@/app/component/customButton/white';
import ModalComponent from '@/app/component/modal';
import FormControl from '@/app/component/formControl';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { userService } from '@/app/services/user.service';
import { IEstimateRequest } from '@/app/interfaces/estimatesInterfaces/estimateRequests.interface';
import { selectEstimateRequests } from '@/redux/estimate/estimateRequestSelector';
import ExistingClient from '../../existingClient';
import CustomNavbar from '@/app/component/customNavbar';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';

const clientInfoSchema: any = Yup.object({
  clientName: Yup.string().required('Field is required!'),
  companyName: Yup.string().required('Field is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string().required('Field is required!'),
  projectName: Yup.string().required('Field is required!'),
  leadSource: Yup.string().required('Field is required!'),
  projectValue: Yup.string().required('Field is required!'),
  projectInformation: Yup.string().required('Field is required!'),
  salePerson: Yup.string().required('Field is required!'),
  estimator: Yup.string().required('Field is required!'),
  architectureDocuments: Yup.array(
    Yup.object({
      name: Yup.string().required(),
      size: Yup.string().required(),
      ext: Yup.string().required(),
      url: Yup.string().required(),
    })
  ).min(1, 'architectureDocuments required'),
  otherDocuments: Yup.array(
    Yup.object({
      name: Yup.string().required(),
      size: Yup.string().required(),
      ext: Yup.string().required(),
      url: Yup.string().required(),
    })
  ).min(1, 'otherDocuments required'),
});

const initialValues: IEstimateRequest = {
  clientName: '',
  companyName: '',
  email: '',
  phone: '',
  projectName: '',
  leadSource: '',
  projectValue: '',
  projectInformation: '',
  salePerson: '',
  estimator: '',
  architectureDocuments: [],
  otherDocuments: [],
};

const EditEstimateRequest = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const estimateRequestsData = useSelector(selectEstimateRequests);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [salePersonsOption, setSalePersonsOption] = useState([]);
  const [estimatorsOption, setEstimatorsOption] = useState([]);
  const [estimateRequestData, setEstimateRequestData] = useState(null);

  useEffect(() => {
    if (id) {
      setEstimateRequestData(
        estimateRequestsData?.find((item: any) => item._id === id)
      );
    }
  }, [id]);

  useEffect(() => {
    fetchUsersHandler();
  }, []);

  const fetchUsersHandler = useCallback(async () => {
    let result: any = await userService.httpGetUsers(
      1,
      9,
      'Estimator,Sales Manager'
    );

    const estimatorData = result.data?.employees
      .filter((user: any) => user.roles.includes('Estimator'))
      .map((option: any) => {
        return {
          label: `${option.firstName} ${option.lastName}`,
          value: `${option._id}`,
        };
      });

    setEstimatorsOption(estimatorData);
    const saleManagers = result.data?.employees
      .filter((user: any) => user.roles.includes('Sales Manager'))
      .map((option: any) => {
        return {
          label: `${option.firstName} ${option.lastName}`,
          value: `${option._id}`,
        };
      });
    setSalePersonsOption(saleManagers);
  }, []);

  const submitHandler = async (values: IEstimateRequest) => {
    let updateEstimateRequestData = {
      clientName: values.clientName,
      companyName: values.companyName,
      email: values.email,
      phone: +values.phone,
      projectName: values.projectName,
      leadSource: values.leadSource,
      projectValue: values.projectValue,
      projectInformation: values.projectInformation,
      salePerson: values.salePerson,
      estimator: values.estimator,
      architectureDocuments: values.architectureDocuments,
      otherDocuments: values.otherDocuments,
    };

    let result = await estimateRequestService.httpUpdateEstimateRequest(
      updateEstimateRequestData,
      id
    );
    if (result.statusCode == 200) {
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
          initialValues={
            estimateRequestData ? estimateRequestData : initialValues
          }
          validationSchema={clientInfoSchema}
          enableReinitialize
          onSubmit={submitHandler}
        >
          {({ handleSubmit, setFieldValue, errors }) => {
            console.log(errors, 'errors');

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
                      setFieldValue('clientName', `${firstName} ${lastName}`);
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
                        control="select"
                        label="Sale Person"
                        name="salePerson"
                        placeholder="Enter sale person"
                        options={salePersonsOption}
                      />
                      <FormControl
                        control="select"
                        label="Estimator"
                        name="estimator"
                        placeholder="Select project manager"
                        options={estimatorsOption}
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
                    <div className="w-[116px]">
                      <CustomButton
                        className="!border-celestialGray shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite !px-5 !py-3 w-full"
                        text="Cancel"
                        onClick={() => router.push('/estimates')}
                      />
                    </div>
                    <div className="w-[116px]">
                      <CustomButton
                        text="Update"
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

export default EditEstimateRequest;
