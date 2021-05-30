import React from "react";

export default function FormFieldError({ errors, touched }) {
  return errors && touched ? (
    <div className="alert text-danger p-0 form-error ml-2">{errors}</div>
  ) : null;
}
