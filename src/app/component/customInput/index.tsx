import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../errorMessage';
import { Input } from 'antd';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { quinaryHeading } from '@/globals/tailwindvariables';
const InputField = (props: any) => {
  const { label, prefix, maxLength, mt = "mt-4",
    inputStyle = "!mt-1.5",
    labelStyle,
    placeholder, name, ...rest } = props;
  return (
    <div className={mt}>
      {
        label && (
          <label
            className={twMerge(clsx(`${labelStyle && quinaryHeading} `))}
            htmlFor={name}
          >
            {label}
          </label>
        )
      }
      <Field name={name} id={name}>
        {({ field }: { field: any }) => (
          <Input
            prefix={prefix}
            className={twMerge(clsx(`border-gray-400 !w-full !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 ${inputStyle && inputStyle}`))}
            type="text"
            maxLength={maxLength}
            {...rest}
            placeholder={placeholder}
            {...field}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default InputField;
