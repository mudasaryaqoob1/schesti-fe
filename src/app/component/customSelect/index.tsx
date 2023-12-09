import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorMsg from '../errorMessage';
import { Select } from 'antd';
// import { CustomSelectContainer } from "./style";

const SelectComp = (props: any) => {
  const { name, placeholder, label, options, ...rest } = props;

  const OptionsArr = options?.map((option: { value: string; key: string }) => {
    return (
      <Select.Option key={option.value} value={option.value}>
        {option.key}
      </Select.Option>
    );
  });

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ form }: { form: any }) => {
          return (
            // <Form.Item name={name}>
            <div className="custom-select-inner">
              <Select
                className="customSelect"
                name={name}
                id={name}
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
            </div>
            // </Form.Item>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default SelectComp;
