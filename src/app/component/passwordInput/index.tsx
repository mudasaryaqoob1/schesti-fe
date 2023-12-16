import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../errorMessage';

import { Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
// import { InputStyleContainer } from "./Style";

const PasswordField = (props: any) => {
  const { placeholder, name, label, ...rest } = props;
  return (
    <div>
      <label
        className={'text-graphiteGray text-sm font-medium leading-6 capitalize'}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name} id={name}>
        {({ field }: { field: any }) => (
          <Input.Password
            className={twMerge(
              'border-gray-400 !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 !mt-1.5 '
            )}
            {...rest}
            placeholder={placeholder}
            {...field}
            iconRender={(visible) =>
              visible ? (
                <span className="paswordIconLabel">
                  <EyeInvisibleOutlined className="text-base" />
                </span>
              ) : (
                <span className="paswordIconLabel">
                  <EyeOutlined className="text-base" />
                </span>
              )
            }
          />
        )}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default PasswordField;
