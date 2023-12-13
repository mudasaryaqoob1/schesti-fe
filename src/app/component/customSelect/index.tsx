import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../errorMessage';
import { Select } from 'antd';
import { Wrapper } from './style';
import { quinaryHeading } from '@/globals/tailwindvariables';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const defaultOptions = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
];

const SelectComp = (props: any) => {
  const {
    name,
    placeholder,
    label,
    labelStyle,
    className,
    options = defaultOptions,
    ...rest
  } = props;

  const OptionsArr = options?.map((option: { value: string; key: string }) => {
    return (
      <Select.Option key={option.value} value={option.value}>
        {option.key}
      </Select.Option>
    );
  });

  return (
    <Wrapper>
      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            clsx(
              `${quinaryHeading} mb-1.5  text-darkgrayish `,
              labelStyle && labelStyle
            )
          )}
        >
          {label}
        </label>
      )}
      <div className={className}>
        <Field name={name} id={name} {...rest}>
          {({ form }: { form: any }) => {
            return (
              // <Form.Item name={name}>
              <Select
                className="w-full"
                name={name}
                id={name}
                size="large"
                {...rest}
                placeholder={placeholder}
                // You have to provide the onChange function and on changing the value you should call
                // the setFieldValue function provided by the prop of "form"
                onChange={(val) => {
                  form.setFieldValue(name, val);
                }}
              >
                {OptionsArr}
              </Select>
              // </Form.Item>
            );
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={ErrorMsg} />
    </Wrapper>
  );
};

export default SelectComp;
