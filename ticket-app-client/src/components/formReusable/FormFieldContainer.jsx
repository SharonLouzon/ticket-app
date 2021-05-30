import React from "react";
import { Field } from "formik";
import FormFieldError from "./FormFieldError";

export default function FormFieldContainer({
  name,
  type,
  loading,
  placeholder,
  errors,
  touched,
  children,
}) {
  return (
    <div className="mb-4">
      <Field
        name={name}
        className="form-control login-form-field"
        disabled={loading}
        placeholder={placeholder}
        type={type}
      />
      <FormFieldError errors={errors[name]} touched={touched[name]} />
      {children}
    </div>
  );
}
