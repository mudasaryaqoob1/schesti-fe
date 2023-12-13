'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import Image from 'next/image';
// import { twMerge } from 'tailwind-merge';

// redux module
import { AppDispatch } from '@/redux/store';
import {
  fetchCompanyDetail,
  updateCompanyDetail,
} from '@/redux/userSlice/user.thunk';

// module imports
import FormControl from '@/app/component/formControl';
import { ICompanyDetailInterface } from '@/app/interfaces/addCompanyDetail.interface';
import {
  bg_style,
  // minHeading,
  // senaryHeading,
} from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { toast } from 'react-toastify';

const initialValues: ICompanyDetailInterface = {
  companyName: '',
  email: '',
  industry: '',
  employee: 1,
  phone: 0,
  website: '',
};

const generalSettingSchema: any = Yup.object({
  companyName: Yup.string().required('Company Name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  industry: Yup.string().required('Industry  is required!'),
  employee: Yup.string().required('Employee is required!'),
  phone: Yup.string().required('Phone  is required!'),
  website: Yup.string().required('Address is required!'),
});
const GeneralSetting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  const data = useSelector((state: any) => state.auth);
  let companyId = data.user._id;

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [clientsData, setClientsData] = useState(null);

  useEffect(() => {
    (async () => {
      let result: any = await dispatch(fetchCompanyDetail(companyId));
      setClientsData(result.payload.data);
    })();
  }, []);

  const submitHandler = async (values: ICompanyDetailInterface) => {
    let result: any = await dispatch(
      updateCompanyDetail({
        companyName: values.companyName,
        industry: values.industry,
        employee: Number(values.employee),
        phone: Number(values.phone),
        website: values.website,
        companyId: companyId,
      })
    );

    if (result.payload.statusCode == 200) {
      toast.success('Detail Update Successfull');
    } else {
      toast.error(result.payload.message);
    }
  };

  if (!clientsData) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={clientsData ? clientsData : initialValues}
        enableReinitialize={true}
        validationSchema={generalSettingSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit }) => {
          return (
            <Form
              name="basic"
              onSubmit={handleSubmit}
              autoComplete="off"
              className={`${bg_style} p-5 `}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-4 ">
                <FormControl
                  control="input"
                  label="Company Name"
                  labelStyle="!text-lightyGrayish"
                  type="text"
                  name="companyName"
                  placeholder="Enter Company Name"
                />
                <FormControl
                  control="input"
                  label="Email"
                  type="email"
                  name="email"
                  labelStyle="!text-lightyGrayish"
                  placeholder="Email Address"
                  readOnly={true}
                />
                <FormControl
                  control="input"
                  label="Industry"
                  type="text"
                  name="industry"
                  labelStyle="!text-lightyGrayish"
                  placeholder="industry"
                />
                <FormControl
                  control="input"
                  label="Total Empolyee"
                  type="number"
                  name="employee"
                  labelStyle="!text-lightyGrayish"
                  placeholder="total empolyee"
                />
                <FormControl
                  control="input"
                  label="Phone Number"
                  type="number"
                  name="phone"
                  labelStyle="!text-lightyGrayish"
                  placeholder="Phone number"
                />
                <FormControl
                  control="input"
                  label="Website"
                  type="text"
                  name="website"
                  labelStyle="!text-lightyGrayish"
                  placeholder="abc@company.com"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <div className="">
                  <Button
                    text="Cancel"
                    className={`!bg-snowWhite !text-[#344054] !py-3 !px-5 !w-28`}
                  />
                </div>
                <div className="w-28">
                  <Button text="Update" type="submit" className="!py-3 !px-5" />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {/* upload */}
      {/* <div className={`${bg_style} p-5 mt-4 `}>
        <div
          className={`px-6 py-4 flex flex-col items-center gap-3
                ${bg_style}
                `}
        >
          <input type="text" id="upload" className="hidden" />
          <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
            <Image
              src={'/uploadcloud.svg'}
              alt="upload icon"
              width={20}
              height={20}
            />
          </div>
          <div className="flex gap-2">
            <label
              htmlFor="upload"
              className={twMerge(
                `${senaryHeading} text-RoyalPurple font-semibold 
                            cursor-pointer
                            `
              )}
            >
              Upload Logo
            </label>
            <input type="file" name="upload" id="upload" className="hidden" />
            <p
              className={`text-steelGray ${minHeading}
                        `}
            >
              or drag and drop
            </p>
          </div>
          <p
            className={`text-steelGray ${minHeading}
                        `}
          >
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default GeneralSetting;
