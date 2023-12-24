'use client';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// setting target service
import { ISettingTaget } from '@/app/interfaces/companyInterfaces/setting.interface';
import { settingTargetService } from '@/app/services/setting/targets.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Image from 'next/image';
import { resetVoidFc, voidFc } from '@/app/utils/types';

const validationSchema = Yup.object({
  month: Yup.string().required('Month is required!'),
  price: Yup.string().required('Price is required!'),
});
const initialValues: ISettingTaget = {
  price: '',
  month: 'January'
};

// months
export const months = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
];

export type SettingTargetProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>
  fetchSettingTargetsHandler: voidFc;
  selectedTarget?: ISettingTaget
}
const CreateTaget = ({ setShowModal, fetchSettingTargetsHandler, selectedTarget }: SettingTargetProps) => {
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  console.log({ selectedTarget })

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: ISettingTaget, { resetForm }: resetVoidFc) => {
    settingTargetService
      .httpAddNewSettingTarget({ ...values, price: values.price.toString() })
      .then((response: any) => {
        if (response.statusCode == 201) {
          setIsLoading(false);
          setShowModal(false);
          fetchSettingTargetsHandler();
          resetForm()
        }
      })
      .catch(({ response }: any) => {
        setIsLoading(false);
        toast.error(response.data.message);
      });
  };



  return (
    <section
      className="flex flex-col rounded-lg border
     border-silverGray shadow-secondaryShadow2 bg-white max-h-[80vh] overflow-y-auto"
    >
      <div className="flex justify-between items-center">
        <TertiaryHeading title='Add New Target' />
        <Image width={16} height={16} src='/closeicon.svg' className='cursor-pointer' alt='close' onClick={() => setShowModal(false)} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit }) => {
          return (
            <Form name="basic" onSubmit={handleSubmit} autoComplete="off" className='mt-2'>
              <FormControl
                control="input"
                label="Set Price"
                type="number"
                name="price"
                placeholder="Enter Price"
              />
              <div className="mt-2.5">
                <FormControl
                  control="select"
                  label="Month"
                  options={months}
                  name="month"
                  placeholder="Month"
                />
              </div>
              <CustomButton
                isLoading={isLoading}
                type="submit"
                text="Save"
                className='mt-7'
              />
            </Form>
          );
        }}
      </Formik>

    </section>
  );
};

export default CreateTaget;
