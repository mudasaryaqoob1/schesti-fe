import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../errorMessage';
import { Input } from 'antd';
import { twMerge } from 'tailwind-merge';

const InputField = (props: any) => {
  const { label, prefix, maxLength, placeholder, name, ...rest } = props;
  return (
    <div className='mt-4'>
      <label
        className={twMerge('font-[500] leading-[20px] capitalize')}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name} id={name}>
        {({ field }: { field: any }) => (
          <Input
            prefix={prefix}
            className={twMerge(
              'border-gray-400  !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 !mt-1.5 '
            )}
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
