'use client';
import { useEffect, useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ColorPicker, Skeleton } from 'antd';
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
import SettingSideBar from '@/app/(pages)/settings/verticleBar';
import { userService } from '@/app/services/user.service';
import { byteConverter } from '@/app/utils/byteConverter';
import { AppDispatch } from '@/redux/store';
import { updateProfileHandler } from '@/redux/authSlices/auth.thunk';
import { CheckOutlined } from '@ant-design/icons';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { withAuth } from '@/app/hoc/withAuth';

const initialValues: IUpdateCompanyDetail = {
  name: '',
  email: '',
  industry: '',
  employee: 1,
  phone: '',
  website: '',
  avatar: '',
  brandingColor: '',
};

const generalSettingSchema: any = Yup.object({
  name: Yup.string().required('Company Name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  industry: Yup.string().required('Industry  is required!'),
  employee: Yup.number().min(1).required('Employee is required!'),
  avatar: Yup.string().required('Avatar is required!'),
  phone: Yup.string(),
  website: Yup.string(),
});
const GeneralSetting = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [userData, setUserData] = useState<IUser | null>(null);
  const [avatarLoading, setavatarLoading] = useState(false);
  const getUserDetail = useCallback(async () => {
    let { data } = await userService.httpGetCompanyDetail();
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
      avatar: values.avatar,
      brandingColor: values.brandingColor,
    };

    let result: any = await dispatch(updateProfileHandler(obj));

    if (result.payload.statusCode == 200) {
      toast.success('Detail Update Successfull');
      setUserData(result.payload.data.user);
    } else {
      toast.error(result.payload.message);
    }
  };

  const avatarUploadHandler = async (e: any) => {
    setavatarLoading(true);
    let avatarUrl = '';

    if (byteConverter(e.target.files[0].size, 'MB').size > 5) {
      toast.warning('Cannot upload image more then 5 mb of size');
      setavatarLoading(false);
      return;
    }

    try {
      await Promise.all(
        Object.keys(e.target.files).map(async (key) => {
          const url = await new AwsS3(
            e.target.files[key],
            'documents/setting/'
          ).getS3URL();
          avatarUrl = url;
        })
      );

      let userObject: any = { ...userData, avatar: avatarUrl };

      setUserData(userObject);

      return avatarUrl;
    } catch (error) {
      console.error('Error uploading documents:', error);
    } finally {
      setavatarLoading(false);
    }
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
            {({ handleSubmit, errors, setFieldValue, values }) => {
              console.log(errors, 'errors');

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
                      min={1}
                    />
                    <FormControl
                      control="input"
                      label="Phone Number"
                      type="number"
                      name="phone"
                      labelStyle="!text-lightyGrayish"
                      placeholder="Phone number"
                      min={0}
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
                  <div className={`${bg_style} grid grid-cols-12 p-5 mt-4 `}>
                    <div
                      className={`px-6 py-4 col-span-8 flex flex-col items-center gap-3 ${
                        errors.avatar ? 'border-red-600' : ''
                      }  ${bg_style}`}
                    >
                      {userData.avatar ? (
                        <Image
                          src={userData.avatar}
                          width={100}
                          height={100}
                          alt="Avatar"
                        />
                      ) : null}
                      <input type="text" id="upload" className="hidden" />
                      <div className="bg-lightGrayish rounded-[28px] border border-solid border-red flex justify-center items-center p-2.5">
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
                            onChange={async (e) => {
                              setFieldValue(
                                'avatar',
                                await avatarUploadHandler(e)
                              );
                            }}
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

                    <div className="col-span-4 px-3 items-center flex space-x-3">
                      <div className="flex-1 relative">
                        <Button
                          text="Primary"
                          onClick={() => {
                            setFieldValue('brandingColor', '');
                          }}
                        />

                        {!values.brandingColor ? (
                          <CheckOutlined className="text-white text-xs bg-[#4CAF50] rounded-full p-1 absolute -top-1 right-0" />
                        ) : (
                          <CheckOutlined className="text-white text-xs bg-[#E7E7E7] rounded-full p-1 absolute -top-1 right-0" />
                        )}
                      </div>

                      <div className="flex-1 relative">
                        <ColorPicker
                          value={values.brandingColor}
                          onChange={(color) => {
                            console.log(color.toHexString());
                            setFieldValue('brandingColor', color.toHexString());
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: values.brandingColor
                                ? values.brandingColor
                                : '#001556',
                              borderColor: values.brandingColor
                                ? values.brandingColor
                                : '#001556',
                            }}
                            type="button"
                            className={`rounded-[8px] border border-solid text-white leading-6 font-semibold py-2 px-5  cursor-pointer shadow-scenarySubdued text-right h-auto text-sm w-full`}
                          >
                            <Image
                              alt="color picker"
                              src={'/Group.svg'}
                              width={30}
                              height={30}
                            />
                          </button>
                          {values.brandingColor ? (
                            <CheckOutlined className="text-white text-xs bg-[#4CAF50] rounded-full p-1 absolute -top-1 right-0" />
                          ) : (
                            <CheckOutlined className="text-white text-xs bg-[#E7E7E7] rounded-full p-1 absolute -top-1 right-0" />
                          )}
                        </ColorPicker>
                      </div>
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

export default withAuth(GeneralSetting);
