import React from "react";
import { Input } from "antd";
import { useField, ErrorMessage } from "formik";
import Errormsg from "../errorMessage";

const Textarea = ({
  placeholder,
  label,
  defaultValue,
  ...props
}: any) => {
  const { TextArea } = Input;

  const [field] = useField(props);

  return (
    <div>
      <label className="text-sm" htmlFor={props.id || props.name}>{label}</label>
      <TextArea
        defaultValue={defaultValue}
        className="mt-2"
        rows={6}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <ErrorMessage name={props.name} component={Errormsg} />
    </div>
  );
};

export default Textarea;
