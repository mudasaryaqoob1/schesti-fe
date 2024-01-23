import { Input, type InputProps } from 'antd';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  labelStyle?: ClassValue;
  name: string;
  prefix?: React.ReactNode;
  placeholder?: string;
  maxLength?: number;
  inputStyle?: ClassValue;
  hasError?: boolean;
  field?: InputProps;
  type: string;
};

export function InputComponent({
  label,
  labelStyle,
  name,
  type,
  prefix,
  placeholder,
  maxLength,
  inputStyle,
  field,
  hasError,
  ...rest
}: Props) {
  return (
    <div>
      <label
        className={twMerge(
          clsx(
            'text-graphiteGray text-sm font-medium leading-6 capitalize',
            labelStyle
          )
        )}
        htmlFor={name}
      >
        {label}
      </label>

      {/* <Field name={name} id={name}>
      {({ field }: { field: any }) => ( */}
      <Input
        id={name}
        type={type}
        prefix={prefix}
        className={twMerge(
          clsx(
            `border ${
              hasError ? 'border-red-500' : 'border-gray-400'
            } !w-full !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 !mt-1.5 ${
              inputStyle && inputStyle
            }`
          )
        )}
        maxLength={maxLength}
        {...rest}
        placeholder={placeholder}
        {...field}
      />
      {/* //   )} */}
      {/* // </Field> */}
      {/* <ErrorMessage name={name} component={ErrorMsg} /> */}
    </div>
  );
}
