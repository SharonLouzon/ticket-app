import React from "react";
import { Field } from "formik";
import { priorityColors } from "../../../components/formReusable/priorityColors";

export default function PriorityPanel({
  priority,
  setFieldValue,
  handlePriorityClick,
  disabled,
}) {
  const createPriorityButton = colorNum => (
    <Field
      key={colorNum}
      id="priority"
      className={`btn border priority-btn ml-2 badge-${
        priority === colorNum ? priorityColors[colorNum] : "light"
      } badge-pill hoverable`}
      type="button"
      value={colorNum}
      onClick={event => {
        setFieldValue("priority", handlePriorityClick(event));
      }}
      disabled={disabled}
    />
  );

  return (
    <div className="input-group ml-3">
      {Object.keys(priorityColors).map(colorNum =>
        createPriorityButton(colorNum)
      )}
      {/* {createPriorityButton({ value: "1", color: "#4fb9fa" })}
      {createPriorityButton({ value: "2", color: "#42ef37" })}
      {createPriorityButton({ value: "3", color: "#f2ed06" })}
      {createPriorityButton({ value: "4", color: "#fe9800" })}
      {createPriorityButton({ value: "5", color: "#d81c1c" })} */}
    </div>
  );
}
