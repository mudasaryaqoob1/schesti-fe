'use client';
import { useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import { IClient } from '@/app/interfaces/companyEmployeeInterfaces/client.interface';
import { senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import MinDesc from '@/app/component/description/minDesc';
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
import CustomNavbar from '@/app/component/customNavbar';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// client service
import { userService } from '@/app/services/user.service';

const newClientSchema = Yup.object({
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string().required('Phone number is required!'),
  companyName: Yup.string().required('Company Name is required!'),
  address: Yup.string().required('Address is required!'),
  address2: Yup.string(),
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

const CreateClient = () => {
  const router = useRouter();
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: IClient) => {
    let result = await userService.httpAddNewClient(values);

    if (result.statusCode == 201) {
      setIsLoading(false);
      router.push('/client');
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <CustomNavbar>
      <section className="mx-16">
        <div className="flex gap-4 items-center my-6">
          <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />
          <p className={`${senaryHeading} font-base text-slateGray`}>
            My Client
          </p>
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />

          <MinDesc
            title="Add New Client"
            className={`${senaryHeading} font-semibold text-lavenderPurple cursor-pointer underline`}
          />
        </div>
        <div
          className="p-5 flex flex-col rounded-lg border
     border-silverGray shadow-secondaryShadow2 bg-white"
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
            {({ handleSubmit }) => {
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
                    <FormControl
                      control="input"
                      label="Phone Number"
                      type="number"
                      name="phone"
                      placeholder="Phone number"
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
                      name="address2"
                      placeholder="Address 2"
                    />
                  </div>
                  <div className="self-end flex justify-end items-center gap-5 md:mt-4 my-3">
                    <div>
                      <CustomButton
                        className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                        text="Cancel"
                        onClick={() => router.push('/client')}
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
    </CustomNavbar>
  );
};

export default CreateClient;
