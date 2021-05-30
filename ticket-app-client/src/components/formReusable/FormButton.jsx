import React from "react";

export default function FormButton(props) {
  const { type, loading, btnText, color, onClick } = props;

  return (
    <button
      type={type}
      className={`btn ${color} w-50 mb-3 round-btn`}
      disabled={loading}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}
