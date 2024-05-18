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
import { isObjectId } from '@/app/utils/utils';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { Country, State, City } from 'country-state-city';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import { ShowFileComponent } from '@/app/(pages)/bid-management/components/ShowFile.component';
const { CONTRACTOR, SUBCONTRACTOR, OWNER } = USER_ROLES_ENUM;

const initialValues: IRegisterCompany = {
  companyName: '',
  industry: '',
  employee: undefined,
  phone: '',
  companyLogo: '',
  city: '',
  state: '',
  country: 'US',
};

const CompanyDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<any>();

  const auth = useSelector((state: RootState) => state.auth);
  const { user: userData } = auth;
  const [country, setCountry] = useState<string>('US');
  const [state, setState] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [city, setCity] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<any>('');
  const [selectedUserRole, setSelectedUserRole] = useState<any>(null);
  // const [phoneNumberErr, setPhoneNumberErr] = useState<string>('');
  const [companyLogoErr, setCompanyLogoErr] = useState<string>('');

  console.log(userData, 'userDatauserData');

  useEffect(() => {
    if (!isObjectId(userId) && !isEmpty(userId)) {
      // setIsLoading(true);
      dispatch(verifyUserEmail(userId));
    }
  }, [userId]);

  const submitHandler = async (values: IRegisterCompany) => {
    // Commenting the Logo Validation as it is not required
    // if (!companyLogo && userData?.user?.userRole === CONTRACTOR) {
    //   setCompanyLogoErr('Logo is required');
    //   return;
    // }
    setIsLoading(true);

    if (companyLogo && userData?.user?.userRole === CONTRACTOR) {
      try {
        const url = await new AwsS3(companyLogo, 'company/logos/').getS3URL();
        values.companyLogo = url;
      } catch (error) {
        console.error('Error uploading documents:', error);
      }
    }


    let result: any = await dispatch(
      addCompanyDetail({ ...values, userId: userId })
    );

    if (result.payload.statusCode == 200) {
      setIsLoading(false);
      localStorage.setItem('schestiToken', result.payload.token);
      if (userData?.user?.userRole === OWNER || userData?.user?.userRole === CONTRACTOR) {
        router.push('/plans');
      } else if (userData?.user?.userRole === SUBCONTRACTOR) {
        router.push('/trades');
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
      <div className="h-[calc(100vh-100px)] mt-4 grid place-items-center">
        <div className="w-full max-w-xl">
          <h2
            className={twMerge(
              `${tertiaryHeading} border-b-2 border=[#E7E7E7]`
            )}
          >
            Setup Company profile
          </h2>
          <div className="mt-6 bg-white shadow-tertiaryMystery p-10 rounded-lg">
            <PrimaryHeading
              title={primaryHeadingTitle}
              className="text-center mb-12"
            />
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema}
              onSubmit={submitHandler}
            >
              {(formik) => {

                const countries = Country.getAllCountries().map((country) => ({
                  label: country.name,
                  value: country.isoCode,
                }));
                const states = State.getAllStates()
                  .filter(
                    (state) =>
                      state.countryCode === country ||
                      formik.values.country === state.countryCode
                  )
                  .map((state) => ({ label: state.name, value: state.isoCode }));
                const cities = City.getCitiesOfState(
                  country,
                  state || formik.values.state
                ).map((city) => ({ label: city.name, value: city.name }));
                return (
                  <Form
                    name="basic"
                    onFinish={formik.handleSubmit}
                    autoComplete="off"
                  // validateMessages={formik.handleSubmit}
                  >
                    <div className="flex flex-col gap-4">
                      {selectedUserRole != OWNER && (
                        <FormControl
                          control="input"
                          label="Company Name"
                          type="text"
                          name="companyName"
                          placeholder="Enter Company Name"
                        />
                      )}

                      <FormControl
                        control="input"
                        label="Address"
                        type="text"
                        name="address"
                        placeholder="Enter Company Address"
                      />


                      <div>
                        <PhoneNumberInputWithLable
                          label='Phone Number'
                          onChange={(value) => {
                            formik.setFieldValue('phone', value);
                          }}
                          value={formik.values.phone}
                          onBlur={() => formik.setFieldTouched('phone', true)}
                          hasError={formik.touched.phone && Boolean(formik.errors.phone)}
                          errorMessage={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                        />
                      </div>
                      {selectedUserRole === OWNER || selectedUserRole === CONTRACTOR || selectedUserRole === SUBCONTRACTOR ? (
                        <>
                          <div className='flex items-center space-x-1 justify-between'>
                            <div className="flex-1">
                              <SelectComponent
                                label='Country'
                                name='country'
                                placeholder='Select Country'
                                field={{
                                  options: countries,
                                  value: formik.values.country,
                                  onChange(value) {
                                    setCountry(value);
                                    formik.setFieldValue('country', value);
                                    formik.setFieldValue('state', '');
                                    formik.setFieldValue('city', '');
                                    setState('');
                                    setCity('');
                                  },
                                  onClear() {
                                    formik.setFieldValue('country', '');
                                    formik.setFieldValue('state', '');
                                    formik.setFieldValue('city', '');
                                    setCountry('');
                                    setState('');
                                    setCity('');
                                  },
                                }}
                              />
                            </div>

                            <div className="flex-1">
                              <SelectComponent
                                label="State"
                                name="state"
                                placeholder="State"
                                field={{
                                  options: states,
                                  value: formik.values.state ? formik.values.state : undefined,
                                  showSearch: true,
                                  placeholder: "State",
                                  onChange(value) {
                                    setState(value);
                                    formik.setFieldValue('state', value);
                                    formik.setFieldValue('city', '');
                                    setCity('');
                                  },
                                  onBlur: formik.handleBlur,
                                  onClear() {
                                    formik.setFieldValue('state', '');
                                    formik.setFieldValue('city', '');
                                    setState('');
                                    setCity('');
                                  },
                                }}
                                errorMessage={formik.touched.state && formik.errors.state ? formik.errors.state : ''}
                                hasError={formik.touched.state && Boolean(formik.errors.state)}
                              />
                            </div>
                          </div>
                          <SelectComponent
                            label="City"
                            name="city"
                            placeholder="City"
                            field={{
                              options: cities,
                              showSearch: true,
                              value: formik.values.city ? formik.values.city : undefined,
                              placeholder: "City",
                              onChange: (value) => {
                                setCity(value);
                                formik.setFieldValue('city', value);
                              },
                              onBlur: formik.handleBlur,
                              allowClear: true,
                              onClear() {
                                formik.setFieldValue('city', '');
                                setCity('');
                              },
                            }}
                            errorMessage={
                              formik.touched.city && formik.errors.city
                                ? formik.errors.city
                                : ''
                            }
                            hasError={formik.touched.city && Boolean(formik.errors.city)}
                          />
                        </>
                      ) : null}
                      {selectedUserRole == OWNER && (
                        <FormControl
                          control="input"
                          label="Organization Name"
                          type="text"
                          name="organizationName"
                          placeholder="Enter Organization Name"
                        />
                      )}



                      {selectedUserRole == CONTRACTOR || selectedUserRole == SUBCONTRACTOR ? (
                        <FormControl
                          control="input"
                          label="Industry"
                          type="select"
                          name="industry"
                          placeholder="Enter industry Name"
                        />
                      ) : null}
                      {(selectedUserRole == CONTRACTOR ||
                        selectedUserRole == SUBCONTRACTOR) && (
                          <>
                            <FormControl
                              control="input"
                              label="Total Employee"
                              type="number"
                              name="employee"
                              placeholder="Total Employee"
                              min={1}
                            />
                            <label htmlFor="myInput">Logo/ Picture</label>
                            <div className="flex items-center">

                              {companyLogo ? <div className='w-[200px]'>
                                <ShowFileComponent
                                  file={{
                                    extension: companyLogo?.type,
                                    name: companyLogo?.name,
                                    type: companyLogo?.type,
                                    url: URL.createObjectURL(companyLogo),
                                  }}
                                  onDelete={() => setCompanyLogo(null)}
                                  shouldFit={false}
                                />
                              </div>
                                : <label
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
                                        setCompanyLogo(file);
                                        setCompanyLogoErr('');
                                      }
                                    }}
                                    type="file"
                                    style={{ opacity: '0' }}
                                    accept="image/*"
                                  />
                                </label>}

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
