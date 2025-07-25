'use client';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';

// module imports
import { senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import MinDesc from '@/app/component/description/minDesc';
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';

// client service
import { PhoneNumberRegex } from '@/app/utils/regex.util';
import { Skeleton } from 'antd';
import { AxiosError } from 'axios';
import { withAuth } from '@/app/hoc/withAuth';
import { Routes } from '@/app/utils/plans.utils';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { CrmType, ICrmItem } from '@/app/interfaces/crm/crm.interface';
import { NoDataComponent } from '@/app/component/noData/NoDataComponent';
import crmService from '@/app/services/crm/crm.service';
import { findCrmItemById } from '../../../utils';

const ValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string()
    .matches(PhoneNumberRegex, 'Phone number must contain numbers')
    .min(7, 'Phone number must be at least 7 characters')
    .max(12, 'Phone number must be at most 12 characters')
    .required('Phone number is required'),
  companyName: Yup.string().required('Company Name is required!'),
  address: Yup.string().required('Address is required!'),
  address2: Yup.string(),
});
const initialValues: Partial<ICrmItem> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  address: '',
  secondAddress: '',
};

const EditArchitect = () => {
  const router = useRouterHook();
  const params = useParams();
  const [item, setItem] = useState<CrmType | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = params as { id: string };

  useEffect(() => {
    findCrmItemById(id, setIsFetching, (item) => {
      setItem(item);
    });
  }, [id]);

  const submitHandler = async (values: ICrmItem) => {
    if (item) {
      setIsLoading(true);
      try {
        const response = await crmService.httpfindByIdAndUpdate(item._id, {
          ...values,
          module: 'architects',
        });
        if (response.data) {
          toast.success('Architect updated successfully');
          router.push(Routes.CRM.Architects);
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || 'Unable to update architect');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 gap-2 grid-rows-2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (!isFetching && !item) {
    return <NoDataComponent />;
  }

  return (
    <section className="mx-4">
      <div className="flex gap-4 items-center my-6">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <p className={`${senaryHeading} font-base text-slateGray`}>
          My Architect
        </p>
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <MinDesc
          title="Edit Architect"
          className={`${senaryHeading} font-semibold text-schestiPrimary cursor-pointer underline`}
        />
      </div>
      <div
        className="p-5 flex flex-col rounded-lg border
     border-silverGray shadow-secondaryShadow2 bg-white"
      >
        <TertiaryHeading
          className="text-graphiteGray mb-4 "
          title="Edit Architect"
        />
        <Formik
          initialValues={
            item ? (item as ICrmItem) : (initialValues as ICrmItem)
          }
          enableReinitialize={true}
          validationSchema={ValidationSchema}
          onSubmit={submitHandler}
        >
          {({
            handleSubmit,
            setFieldValue,
            values,
            setFieldTouched,
            touched,
            errors,
          }) => {
            return (
              <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4">
                  <FormControl
                    control="input"
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <FormControl
                    control="input"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <PhoneNumberInputWithLable
                    label="Phone Number"
                    //@ts-ignore
                    onChange={(val: string) => setFieldValue('phone', val)}
                    //@ts-ignore
                    value={values.phone}
                    onBlur={() => setFieldTouched('phone', true)}
                    hasError={touched.phone && Boolean(errors.phone)}
                    errorMessage={
                      touched.phone && errors.phone ? errors.phone : ''
                    }
                  />
                  <FormControl
                    control="input"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    readOnly={true}
                  />
                  <div className="md:col-span-full">
                    <FormControl
                      control="input"
                      label="Company Name"
                      type="text"
                      name="companyName"
                      placeholder="Enter Company Name"
                    />
                  </div>
                  <FormControl
                    control="input"
                    label="Address"
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                  <FormControl
                    control="input"
                    label="Address 2"
                    type="text"
                    name="secondAddress"
                    placeholder="Address 2"
                  />
                </div>
                <div className="self-end flex justify-end items-center gap-5 md:mt-4 my-3">
                  <div>
                    <CustomButton
                      className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                      text="Cancel"
                      onClick={() => router.back()}
                    />
                  </div>
                  <div>
                    <CustomButton
                      isLoading={isLoading}
                      type="submit"
                      text="Update and Continue"
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default withAuth(EditArchitect);
