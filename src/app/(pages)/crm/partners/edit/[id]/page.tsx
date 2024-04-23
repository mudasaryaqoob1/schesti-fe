'use client';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import { IPartner } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import MinDesc from '@/app/component/description/minDesc';
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// partner service
import { userService } from '@/app/services/user.service';
import { PhoneNumberRegex } from '@/app/utils/regex.util';
import { withAuth } from '@/app/hoc/withAuth';
import { Routes } from '@/app/utils/plans.utils';

const newPartnerSchema = Yup.object({
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
const initialValues: IPartner = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  address: '',
  secondAddress: '',
};

const EditPartner = () => {
  const router = useRouter();
  const params = useParams();
  const token = useSelector(selectToken);

  const { id } = params as { id: string };

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);
  const [partnerDetail, setPartnerDetail] = useState<IPartner | undefined>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    secondAddress: '',
  })


const fetchPartnerDetail = useCallback(async () => {
  const partnerDetail = await userService.httpFindCompanyPartnerDetail(id)
  setPartnerDetail(partnerDetail?.data?.partner)
},[])


  useEffect(() => {
    fetchPartnerDetail()
  },[])

  const submitHandler = async (values: IPartner) => {
    setIsLoading(true);
    let updatePartnerBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      companyName: values.companyName,
      address: values.address,
      secondAddress: values.secondAddress,
    };
    let result = await userService.httpUpdatePartner(updatePartnerBody, id);
    if (result.statusCode == 200) {
      setIsLoading(false);
      router.push(Routes.CRM.Partners);
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };


  return (
    <section className="mx-16">
      <div className="flex gap-4 items-center my-6">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <p className={`${senaryHeading} font-base text-slateGray`}>My Partners</p>
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <MinDesc
          title="Add New Partner"
          className={`${senaryHeading} font-semibold text-lavenderPurple cursor-pointer underline`}
        />
      </div>
      <div
        className="p-5 flex flex-col rounded-lg border border-silverGray shadow-secondaryShadow2 bg-white"
      >
        <TertiaryHeading
          className="text-graphiteGray mb-4 "
          title="Add New Partner"
        />
        <Formik
          initialValues={partnerDetail ? partnerDetail : initialValues}
          enableReinitialize={true}
          validationSchema={newPartnerSchema}
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
                    type="text"
                    name="phone"
                    placeholder="Phone number"
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
                      text="Update and Save"
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

export default withAuth(EditPartner);
