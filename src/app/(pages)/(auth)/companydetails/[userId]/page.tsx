'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Form } from 'antd';
import FormControl from '@/app/component/formControl';
import { useParams, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import Progessbar from '@/app/component/progressBar';
import PrimaryHeading from '@/app/component/headings/primary';
import Button from '@/app/component/customButton/button';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { AppDispatch, RootState } from '@/redux/store';
import { IRegisterCompany } from '@/app/interfaces/companyInterfaces/companyRegister.interface';
import {
  addCompanyDetail,
  verifyUserEmail,
} from '@/redux/authSlices/auth.thunk';
import AuthNavbar from '@/app/(pages)/(auth)/authNavbar';
import { isEmpty } from 'lodash';
import Errormsg from '@/app/component/errorMessage';
import AwsS3 from '@/app/utils/S3Intergration';
import { USER_ROLES_ENUM } from '@/app/constants/constant';
import {
  ContractorSchema,
  OwnerSchema,
  SubContractorSchema,
} from '@/app/utils/validationSchemas';
import PhoneNumberInput from '@/app/component/phoneNumberInput';
import { isObjectId } from '@/app/utils/utils';

const { CONTRACTOR, SUBCONTRACTOR, OWNER } = USER_ROLES_ENUM;

const initialValues: IRegisterCompany = {
  companyName: '',
  industry: '',
  employee: 1,
  phoneNumber: null,
  companyLogo: '',
};

const CompanyDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<any>();

  const auth = useSelector((state: RootState) => state.auth);
  const { user: userData } = auth;

  const [isLoading, setIsLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<any>('');
  const [selectedUserRole, setSelectedUserRole] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  // const [phoneNumberErr, setPhoneNumberErr] = useState<string>('');
  const [companyLogoErr, setCompanyLogoErr] = useState<string>('');

  useEffect(() => {
    if (!isObjectId(userId) && !isEmpty(userId)) {
      setIsLoading(true);
      dispatch(verifyUserEmail(userId))
        .unwrap()
        .then(() => {
          setIsLoading(false);
        })
        .catch((err: any) => {
          setIsLoading(false);
          console.log('verification err', err);
        });
    }
  }, [userData, userId]);

  const submitHandler = async (values: IRegisterCompany) => {
    if (!companyLogo && userData?.user?.userRole === CONTRACTOR) {
      setCompanyLogoErr('Company Logo is required');
      return;
    }

    setIsLoading(true);
    if (companyLogo && userData?.user?.userRole === CONTRACTOR) {
      try {
        const url = await new AwsS3(companyLogo, 'company/logos/').getS3URL();
        console.log('url', url);
        // logoUrl = url;
        values.companyLogo = url;
      } catch (error) {
        console.error('Error uploading documents:', error);
      }
    }

    let result: any = await dispatch(
      addCompanyDetail({ ...values, userId: userId, phoneNumber: phoneNumber })
    );

    if (result.payload.statusCode == 200) {
      setIsLoading(false);
      console.log('console.log', result.payload);
      localStorage.setItem('schestiToken', result.payload.token);
      if (userData?.user?.userRole === OWNER) {
        router.push('/plans');
      } else if (userData?.user?.userRole === SUBCONTRACTOR) {
        router.push('/trades');
      } else if (userData?.user?.userRole === CONTRACTOR) {
        router.push('/verification');
      }
    } else {
      setIsLoading(false);
      toast.error(result.payload.message);
    }
  };

  const primaryHeadingTitle = useMemo(() => {
    if (userData?.user?.userRole == OWNER) {
      setSelectedUserRole(OWNER);
      return 'Owner/Client Information';
    } else if (userData?.user?.userRole == SUBCONTRACTOR) {
      setSelectedUserRole(SUBCONTRACTOR);
      return 'Company/Personal Information';
    } else {
      setSelectedUserRole(CONTRACTOR);
      return 'Company Details';
    }
  }, [userData?.user]);

  const getValidationSchema = useMemo(() => {
    if (userData?.user?.userRole == OWNER) {
      return OwnerSchema;
    } else if (userData?.user?.userRole == SUBCONTRACTOR) {
      return SubContractorSchema;
    } else if (userData?.user?.userRole == CONTRACTOR) {
      return ContractorSchema;
    }
  }, [userData]);

  return (
    <>
      <AuthNavbar />
      <div className="h-[calc(100vh-100px)] mt-2 grid place-items-center">
        <div className="w-full max-w-xl bg-snowWhite">
          <h2 className={twMerge(`${tertiaryHeading} mb-4 `)}>
            Setup Company profile
          </h2>
          <div className="w-full h-1 bg-mistyWhite"></div>
          <div className="mt-6 bg-snowWhite shadow-tertiaryMystery p-10">
            <PrimaryHeading
              title={primaryHeadingTitle}
              className="text-center mb-12"
            />
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema}
              onSubmit={submitHandler}
            >
              {(formik: any) => {
                console.log('formik', formik);
                return (
                  <Form
                    name="basic"
                    onFinish={formik.handleSubmit}
                    autoComplete="off"
                    // validateMessages={formik.handleSubmit}
                  >
                    <div className="flex flex-col gap-4">
                      {(selectedUserRole == SUBCONTRACTOR ||
                        selectedUserRole == OWNER) && (
                        <FormControl
                          control="input"
                          label="Address"
                          type="text"
                          name="address"
                          placeholder="Enter Company Address"
                        />
                      )}
                      {selectedUserRole != OWNER && (
                        <FormControl
                          control="input"
                          label="Company Name"
                          type="text"
                          name="companyName"
                          placeholder="Enter Company Name"
                        />
                      )}
                      <div>
                        <span>Phone Number</span>
                        <PhoneNumberInput
                          phoneNumber={phoneNumber}
                          setPhoneNumber={setPhoneNumber}
                        />
                      </div>
                      {/* <FormControl
                        control="input"
                        label="Phone Number"
                        type="string"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                      /> */}
                      {selectedUserRole == OWNER && (
                        <FormControl
                          control="input"
                          label="Organization Name"
                          type="text"
                          name="organizationName"
                          placeholder="Enter Organization Name"
                        />
                      )}
                      {selectedUserRole == CONTRACTOR && (
                        <FormControl
                          control="input"
                          label="Industry"
                          type="select"
                          name="industry"
                          placeholder="Enter industry Name"
                        />
                      )}
                      {(selectedUserRole == CONTRACTOR ||
                        selectedUserRole == SUBCONTRACTOR) && (
                        <>
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
                              className="flex flex-col items-center justify-center w-22 h-22 border-2 border-solid rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                                {!companyLogo && (
                                  <>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold text-purple-600">
                                        Click to upload
                                      </span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      PNG, JPG (max. 800x400px)
                                    </p>
                                  </>
                                )}
                              </div>
                              <input
                                id="dropzone-file"
                                onChange={(e: any) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    // Check file size (max size: 800x400px)
                                    // const maxFileSize = 800 * 400; // 800x400px
                                    // if (file.size > maxFileSize) {
                                    //   setCompanyLogoErr(
                                    //     'Image size should be less than 800x400 pixels'
                                    //   );
                                    //   e.target.value = ''; // Clear the file input to allow re-selection
                                    //   return;
                                    // }
                                    setCompanyLogo(file);
                                    setCompanyLogoErr('');
                                  }
                                }}
                                type="file"
                                style={{ opacity: '0' }}
                                accept="image/*"
                              />
                              {companyLogo && (
                                <>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold text-purple-600">
                                      {companyLogo?.name}
                                    </span>
                                  </p>
                                </>
                              )}
                            </label>
                          </div>
                          {!isEmpty(companyLogoErr) && (
                            <Errormsg>{companyLogoErr}</Errormsg>
                          )}
                        </>
                      )}
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
