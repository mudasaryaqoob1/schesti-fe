'use client';
import Button from '@/app/component/customButton/button';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import TertiaryHeading from '@/app/component/headings/tertiary';
import FormControl from '@/app/component/formControl';
import { Formik, Form } from 'formik';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import CustomButton from '@/app/component/customButton/button';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { PhoneNumberRegex } from '@/app/utils/regex.util';
import { userService } from '@/app/services/user.service';
import { toast } from 'react-toastify';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedClient:any;
}

const newClientSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(15, 'First name must be less than 15 characters')
    .required('First name is required!'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(15, 'Last name must be less than 15 characters')
    .required('Last name is required!'),
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
  secondAddress: Yup.string(),
});
const initialValues: IClient = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  address: '',
  secondAddress: '',
};

const ScaleModal = ({ setModalOpen,setSelectedClient }: Props) => {

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: IClient) => {
    setIsLoading(true);
    userService
      .httpAddNewClient({ ...values, phone: `${values.phone}` })
      .then((response: any) => {
        console.log(response, " ===> response response create client")
        if (response.statusCode == 201) {
          setIsLoading(false);
          // router.push(Routes.CRM.Clients);
          setSelectedClient(response?.data?.client)
          setModalOpen(false)
        }
      })
      .catch(({ response }: any) => {
        setIsLoading(false);
        toast.error(response.data.message);
      });
  };

  const handleCalibrate = () => {
  };

  return (
    <div className="py-2.5 px-6 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Scale"
              className="text-graphiteGray font-bold"
            />
            {/* <QuinaryHeading
              title="Select any existing client from here."
              className="text-coolGray"
            /> */}
          </div>
          <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div
          className="p-5 flex flex-col rounded-lg border border-silverGray shadow-secondaryShadow2 bg-white"
        >
          <TertiaryHeading
            className="text-graphiteGray mb-4 "
            title="Add New Client"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={newClientSchema}
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
                      onChange={(val: string) => setFieldValue('phone', val)}
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
                        onClick={() => {setModalOpen(false)}}//router.back()
                      />
                    </div>
                    <div>
                      <CustomButton
                        isLoading={isLoading}
                        type="submit"
                        text="Save"
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
      {/* <div className="flex justify-end gap-4 mt-5 mb-2">
        <div>
          <Button
            text="Cancel"
            className="!bg-snowWhite !text-abyssalBlack !py-1.5 "
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div>
          <Button
            text="Calibrate"
            onClick={handleCalibrate}
            className="!py-1.5"
          />
        </div>
      </div> */}
    </div>
  );
};

export default ScaleModal;
