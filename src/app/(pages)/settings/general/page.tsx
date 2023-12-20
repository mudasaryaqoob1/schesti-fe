'use client';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Skeleton } from 'antd';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

// module imports
import AwsS3 from '@/app/utils/S3Intergration';
import FormControl from '@/app/component/formControl';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
import {
  bg_style,
  minHeading,
  senaryHeading,
} from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import SettingSideBar from '@/app/(pages)/settings/verticleBar';
import { userService } from '@/app/services/user.service';
import { byteConverter } from '@/app/utils/byteConverter';
import { AppDispatch } from '@/redux/store';
import { updateProfileHandler } from '@/redux/authSlices/auth.thunk';

const initialValues: IUpdateCompanyDetail = {
  name: '',
  email: '',
  industry: '',
  employee: 1,
  phone: 0,
  website: '',
  avatar: '',
};

const generalSettingSchema: any = Yup.object({
  name: Yup.string().required('Company Name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  industry: Yup.string().required('Industry  is required!'),
  employee: Yup.string().required('Employee is required!'),
  phone: Yup.string().required('Phone  is required!'),
  website: Yup.string().required('Address is required!'),
});
const GeneralSetting = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [avatarLoading, setavatarLoading] = useState(false);

  const getUserDetail = useCallback(async () => {
    let { data } = await userService.httpGetCompanyDetail();
    setAvatar(data.user.avatar);
    setUserData(data.user);
  }, []);

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);

  const submitHandler = async (values: any) => {
    let obj = {
      name: values.name,
      industry: values.industry,
      employee: Number(values.employee),
      phone: Number(values.phone),
      website: values.website,
      avatar: avatar,
    };

    let result: any = await dispatch(updateProfileHandler(obj));

    if (result.payload.statusCode == 200) {
      toast.success('Detail Update Successfull');
    } else {
      toast.error(result.payload.message);
    }
  };

  const avatarUploadHandler = async (e: any) => {
    let selectedFile = e.target.files[0];
    setavatarLoading(true);
    if (byteConverter(selectedFile.size, 'MB').size > 5) {
      toast.warning('Cannot upload image more then 5 mb of size');
      return;
    }

    const url = await new AwsS3(selectedFile, 'photos/avatars/').getS3URL();
    setavatarLoading(false);
    setAvatar(url);
  };

  return (
    <SettingSideBar>
      {!userData ? (
        <div className="flex flex-col w-full mt-5">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <div className="w-full">
          <Formik
            initialValues={userData ? userData : initialValues}
            enableReinitialize={true}
            validationSchema={generalSettingSchema}
            onSubmit={submitHandler}
          >
            {({ handleSubmit }) => {
              return (
                <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-4 ${bg_style} p-5`}
                  >
                    <FormControl
                      control="input"
                      label="Company Name"
                      labelStyle="!text-lightyGrayish"
                      type="text"
                      name="name"
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
                      placeholder="company.com"
                    />
                  </div>

                  {/* Upload Image Div */}
                  <div className={`${bg_style} p-5 mt-4 `}>
                    <div
                      className={`px-6 py-4 flex flex-col items-center gap-3 ${bg_style}`}
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
                      {avatarLoading ? (
                        <p>Uploading...</p>
                      ) : (
                        <div className="flex gap-2">
                          <label
                            htmlFor="uploadCompanyLogo"
                            className={twMerge(
                              `${senaryHeading} text-RoyalPurple font-semibold cursor-pointer`
                            )}
                          >
                            Upload Logo
                          </label>
                          <input
                            type="file"
                            name="uploadLogo"
                            id="uploadCompanyLogo"
                            className="hidden"
                            onChange={avatarUploadHandler}
                          />
                          <p className={`text-steelGray ${minHeading}`}>
                            or drag and drop
                          </p>
                        </div>
                      )}

                      <p className={`text-steelGray ${minHeading}`}>
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <div className="">
                      <Button
                        text="Cancel"
                        className={`!bg-snowWhite !text-[#344054] !py-3 !px-5 !w-28`}
                      />
                    </div>
                    <div className="w-28">
                      <Button
                        text="Update"
                        type="submit"
                        className="!py-3 !px-5"
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {/* upload */}
        </div>
      )}
    </SettingSideBar>
  );
};

export default GeneralSetting;
