import CustomButton from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import { TextAreaComponent } from '@/app/component/textarea';
import { Drawer } from 'antd';
import Image from 'next/image';
import WhiteButton from '@/app/component/customButton/white';
import type { FormikProps } from 'formik';
import { ICrmDailyWorkCreate } from '@/app/services/crm/crm-daily-work.service';
import dayjs from 'dayjs';

type Props = {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<ICrmDailyWorkCreate>;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};
export function DailyWorkForm({
  onClose,
  open,
  formik,
  onSubmit,
  isSubmitting,
}: Props) {
  return (
    <Drawer
      title="Daily Work Lead"
      placement="right"
      open={open}
      width={600}
      closable={false}
      extra={
        <Image
          src="/closeicon.svg"
          alt="close"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={onClose}
        />
      }
      headerStyle={{
        backgroundColor: '#E6F2F8',
      }}
    >
      <div className="space-y-3">
        <InputComponent
          label="Needed"
          name="work"
          placeholder="Enter Work Needed"
          type="text"
          field={{
            value: formik.values.work,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
          hasError={formik.touched.work && Boolean(formik.errors.work)}
          errorMessage={
            formik.touched.work && formik.errors.work ? formik.errors.work : ''
          }
        />
        <PhoneNumberInputWithLable
          label="Phone Number"
          //@ts-ignore
          onChange={(val) => {
            //@ts-ignore
            formik.setFieldValue('phone', val);
          }}
          onBlur={() => formik.setFieldTouched('phone', true)}
          defaultCountry="US"
          value={formik.values.phone as any}
          hasError={formik.touched.phone && Boolean(formik.errors.phone)}
          errorMessage={
            formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : ''
          }
        />
        <InputComponent
          label="Email"
          name="email"
          type="email"
          placeholder="Enter Email"
          field={{
            value: formik.values.email,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
          hasError={formik.touched.email && Boolean(formik.errors.email)}
          errorMessage={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ''
          }
        />

        <DateInputComponent
          label="Deadline"
          name="deadline"
          fieldProps={{
            value: formik.values.deadline
              ? dayjs(formik.values.deadline)
              : undefined,
            onChange: (_, dateString) => {
              formik.setFieldValue('deadline', dateString as string);
            },
            onBlur: formik.handleBlur,
          }}
          hasError={formik.touched.deadline && Boolean(formik.errors.deadline)}
          errorMessage={
            formik.touched.deadline && formik.errors.deadline
              ? formik.errors.deadline
              : ''
          }
        />

        <TextAreaComponent
          label="Note"
          placeholder="Enter Note"
          name="note"
          field={{
            rows: 10,
            value: formik.values.note,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            maxLength: 10,
          }}
          hasError={formik.touched.note && Boolean(formik.errors.note)}
          errorMessage={
            formik.touched.note && formik.errors.note ? formik.errors.note : ''
          }
        />

        <div className="flex items-center justify-between">
          <WhiteButton onClick={onClose} text="Cancel" className="!w-40" />
          <CustomButton
            text={'Save'}
            className="!w-40"
            loadingText="Saving..."
            onClick={onSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </Drawer>
  );
}
