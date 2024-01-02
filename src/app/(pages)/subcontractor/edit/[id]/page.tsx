'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import { senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import MinDesc from '@/app/component/description/minDesc';
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// subcontractorService service
import { subcontractorService } from '@/app/services/subcontractor.service';
import { ISubcontract } from '@/app/interfaces/companyInterfaces/subcontractor.interface';
import { selectSubcontracters } from '@/redux/company/companySelector';

const editSubcontractorSchema = Yup.object({
  companyRep: Yup.string().required('Company Rep is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string().required('Phone number is required!'),
  name: Yup.string().required('Company Name is required!'),
  address: Yup.string().required('Address is required!'),
  address2: Yup.string(),
});
const initialValues: ISubcontract = {
  companyRep: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  secondAddress: '',
};

const EditSubcontractor = () => {
  const router = useRouter();
  const params = useParams();
  const token = useSelector(selectToken);
  const subcontractsData = useSelector(selectSubcontracters);

  const { id } = params;

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);
  const [subcontractorData, setSubcontractorData] = useState(null);

  useEffect(() => {
    setSubcontractorData(subcontractsData.find((item: any) => item._id === id));
  }, [id, subcontractsData]);

  const submitHandler = async (values: ISubcontract) => {
    setIsLoading(true);
    let updateContractorBody = {
      companyRep: values.companyRep,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      secondAddress: values.secondAddress,
    };
    setIsLoading(true);
    let result = await subcontractorService.httpUpdateSubontractor(
      updateContractorBody,
      id
    );
    if (result.statusCode == 200) {
      setIsLoading(false);
      router.push('/subcontractor');
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
        <p className={`${senaryHeading} font-base text-slateGray`}>
          My Subcontract
        </p>
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <MinDesc
          title="Edit Subcontractor"
          className={`${senaryHeading} font-semibold text-lavenderPurple cursor-pointer underline`}
        />
      </div>
      <div
        className="p-5 flex flex-col rounded-lg border
     border-silverGray shadow-secondaryShadow2 bg-white"
      >
        <TertiaryHeading
          className="text-graphiteGray mb-4 "
          title="Edit Subcontractor"
        />
        <Formik
          initialValues={subcontractorData ? subcontractorData : initialValues}
          enableReinitialize={true}
          validationSchema={editSubcontractorSchema}
          onSubmit={submitHandler}
        >
          {({ handleSubmit }) => {
            return (
              <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4">
                  <FormControl
                    control="input"
                    label="Company Rep"
                    type="text"
                    name="companyRep"
                    placeholder="Company Rep"
                  />
                  <FormControl
                    control="input"
                    label="Company Name"
                    type="text"
                    name="name"
                    placeholder="Company Name"
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
                    readOnly={true}
                  />

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
                      onClick={() => router.push('/subcontractor')}
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

export default EditSubcontractor;
