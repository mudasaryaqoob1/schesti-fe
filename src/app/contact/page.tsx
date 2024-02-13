'use client';
import Image from 'next/image';
import { InputComponent } from '../component/customInput/Input';
import { LandingNavbar } from '../component/navbar/LandingNavbar';
import { SelectComponent } from '../component/customSelect/Select.component';
import { ConfigProvider } from 'antd';
import CustomButton from '../component/customButton/button';
import LandingFooter from '../component/footer/LandingFooter';
import { GatewayToEfficiency } from '../component/landing/GatewayToEfficiency';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { contactService } from '../services/contact.service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResponseInterface } from '../interfaces/api-response.interface';

const GetInTouchSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  company: Yup.string().required('Company name is required'),
  employees: Yup.string().required('Choose number of employees'),
});

export default function ContactPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      employees: '',
    },
    validationSchema: GetInTouchSchema,
    onSubmit: (values) => {
      contactService
        .httpSendContactInfoToClient(values)
        .then((res) => {
          if (res.statusCode === 201) {
            formik.resetForm();
            toast.success(res.message);
          }
        })
        .catch(({ response }: AxiosError<IResponseInterface>) => {
          toast.error(response?.data?.message || 'Something went wrong');
        });
    },
  });
  return (
    <section>
      <main
        style={{
          background: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
        }}
        className="h-[501px] relative"
      >
        <LandingNavbar />
        <div className="mt-[101px] mx-auto w-[1063px]">
          <h1 className="text-center font-extrabold text-white text-[64px] leading-[80px]">
            Get in Touch With Us
          </h1>
          <p className="text-center text-white w-[774px] leading-[44px] font-light text-[24px] mx-auto my-[26px]">
            Schesti is here to help you at any stage of your project
            <br /> management journey.
          </p>
        </div>
      </main>

      <div className="px-[200px] mt-[151px]">
        <div className="grid grid-cols-2 gap-64">
          <div>
            <h1 className=" text-[#1D2939] font-bold mt-[15px] leading-[54.181px] text-[36.121px]">
              Ready to see Wrike for yourself?
            </h1>
            <p className="mt-[11px] text-[#475467] text-[20px] leading-[40px] font-normal">
              {"We'"}d love to show you how Wrike can help your team do more of
              their best work. Fill out the form and {"we'"}ll be in touch
              within 24 hours.
            </p>
            <div className="flex space-x-4 my-[36px]">
              <Image
                src={'/navigation-icon.svg'}
                alt="navigation-icon"
                width={24}
                height={24}
                className="mt-2"
              />
              <div>
                <p className="mt-[11px] text-[#344054] text-[18px] leading-[18px] font-semibold">
                  OUR OFFICE ADDRESS:
                </p>
                <p className="mt-[11px] text-[#475467] text-[20px] leading-[34px] font-normal">
                  5109 Hollyridge Dr, Ste 102 Raleigh, NC 27612
                </p>
              </div>
            </div>
            <div className="flex space-x-4 my-[36px]">
              <Image
                src={'/call-icon.svg'}
                alt="call-icon"
                width={24}
                height={24}
                className="mt-2"
              />
              <div>
                <p className="mt-[11px] text-[#344054] text-[18px] leading-[18px] font-semibold">
                  CALL US:
                </p>
                <p className="mt-[11px] text-[#475467] text-[20px] leading-[34px] font-normal">
                  +1 (919)610 7760
                </p>
              </div>
            </div>

            <div className="flex space-x-4 my-[36px]">
              <Image
                src={'/mail-icon.svg'}
                alt="call-icon"
                width={24}
                height={24}
                className="mt-2"
              />
              <div>
                <p className="mt-[11px] text-[#344054] text-[18px] leading-[18px] font-semibold">
                  MAIL US:
                </p>
                <p className="mt-[11px] text-[#475467] text-[20px] leading-[34px] font-normal">
                  Info@schesti.com
                </p>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-evenly"
          >
            <InputComponent
              label="Name"
              placeholder="Enter your name"
              name="name"
              type="text"
              inputStyle="!bg-[#D0D5DD32]"
              field={{
                value: formik.values.name,
                onChange: (e) => {
                  formik.handleChange(e);
                },
                onBlur: (e) => {
                  formik.handleBlur(e);
                },
              }}
              hasError={formik.touched.name && Boolean(formik.errors.name)}
              errorMessage={formik.errors.name}
            />
            <InputComponent
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
              inputStyle="!bg-[#D0D5DD32]"
              field={{
                value: formik.values.email,
                onChange: (e) => {
                  formik.handleChange(e);
                },
                onBlur: (e) => {
                  formik.handleBlur(e);
                },
              }}
              hasError={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
            />
            <InputComponent
              label="Phone number"
              placeholder="Enter your phone"
              name="phone"
              type="text"
              inputStyle="!bg-[#D0D5DD32]"
              field={{
                value: formik.values.phone,
                onChange: (e) => {
                  formik.handleChange(e);
                },
                onBlur: (e) => {
                  formik.handleBlur(e);
                },
              }}
              hasError={formik.touched.phone && Boolean(formik.errors.phone)}
              errorMessage={formik.errors.phone}
            />
            <InputComponent
              label="Company"
              placeholder="Enter company name"
              name="company"
              type="text"
              inputStyle="!bg-[#D0D5DD32]"
              field={{
                value: formik.values.company,
                onChange: (e) => {
                  formik.handleChange(e);
                },
                onBlur: (e) => {
                  formik.handleBlur(e);
                },
              }}
              hasError={
                formik.touched.company && Boolean(formik.errors.company)
              }
              errorMessage={formik.errors.company}
            />
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorBgContainer: '#D0D5DD32',
                    colorBorder:
                      formik.touched.employees &&
                      Boolean(formik.errors.employees)
                        ? '#F83F23'
                        : '#D0D5DD',
                  },
                },
              }}
            >
              <SelectComponent
                label="Number of employees"
                name="employees"
                placeholder="Select number of employees"
                field={{
                  options: [
                    { label: '1-10', value: '1-10' },
                    { label: '11-50', value: '11-50' },
                    { label: '51-200', value: '51-200' },
                  ],
                  size: 'large',
                  value: formik.values.employees,
                  onChange(value) {
                    formik.setFieldValue('employees', value);
                  },
                  onBlur(e) {
                    formik.handleBlur(e);
                  },
                }}
                hasError={
                  formik.touched.employees && Boolean(formik.errors.employees)
                }
                errorMessage={formik.errors.employees}
              />
            </ConfigProvider>
            <p className="mt-[11px] text-[#475467] text-[14px] leading-[34px] font-normal">
              By completing and submitting the form, I acknowledge Wrike’s
              Privacy Policy.
            </p>
            <CustomButton
              type="submit"
              text="Get in touch"
              className="!rounded-full !w-48 self-end !bg-[#7138DF]"
            />
          </form>
        </div>
      </div>

      <GatewayToEfficiency />

      <LandingFooter />
    </section>
  );
}
