'use client';
import { useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import TertiaryHeading from '@/app/component/headings/tertiary';
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// settingTarget service
import { ISettingTaget } from '@/app/interfaces/companyInterfaces/setting.interface';
import { settingTargetService } from '@/app/services/setting/targets.service';
import Image from 'next/image';
import { resetVoidFc } from '@/app/utils/types';
import { SettingTargetProps, months } from './create';

const validationSchema = Yup.object({
  month: Yup.string().required('Month is required!'),
  price: Yup.string().required('Price is required!'),
});

const EditTaget = ({ setShowModal, fetchSettingTargetsHandler, selectedTarget }: SettingTargetProps) => {
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const initialValues: ISettingTaget = {
    month: selectedTarget?.month || '',
    price: selectedTarget?.price || ''
  };
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async ({ price, month }: ISettingTaget, { resetForm }: resetVoidFc) => {
    setIsLoading(true);
    let updateSettingTargetBody = {
      price: price.toString(),
      month
    };
    setIsLoading(true);
    let result = await settingTargetService.httpUpdateSettingTarget(
      updateSettingTargetBody,
      selectedTarget?._id!
    );
    if (result.statusCode == 200) {
      setIsLoading(false);
      resetForm();
      fetchSettingTargetsHandler();
      setShowModal(false);
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <section
      className="p-3 flex flex-col rounded-lg border
 border-silverGray shadow-secondaryShadow2 bg-white max-w-[330]"
    >
      <div className="flex justify-between items-center">
        <TertiaryHeading
          className="text-graphiteGray mb-4 "
          title="Edit Target"
        />
        <Image width={16} height={16} src='/closeicon.svg' className='cursor-pointer' alt='close' onClick={() => setShowModal(false)} />
      </div>
      <Formik
        initialValues={
          initialValues
        }
        enableReinitialize
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
              <div className="mt-2 5">
                <FormControl
                  control="select"
                  label="Month"
                  type="text"
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

export default EditTaget
  ;
