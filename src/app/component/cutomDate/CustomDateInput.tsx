import { DatePicker, type DatePickerProps } from 'antd';
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
  fieldProps?: DatePickerProps;
  hasError?: boolean;
  errorMessage?: string;
};

export function DateInputComponent({
  label,
  labelStyle,
  name,
  placeholder,
  hasError,
  inputStyle,
  fieldProps,
  errorMessage = "",
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
      <DatePicker
        id={name}
        className={twMerge(
          clsx(
            `border ${hasError ? 'border-red-500' : 'border-gray-400'
            } !w-full !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 !mt-1.5 ${inputStyle && inputStyle
            }`
          )
        )}
        name={name}
        placeholder={placeholder}
        {...fieldProps}
      />
      {/* //   )} */}
      {/* // </Field> */}
      {hasError && (
        <p className="text-red-500 text-xs mt-1.5">{errorMessage}</p>
      )}
    </div>
  );
}
