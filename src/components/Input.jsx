import React from "react";

export default function Input({ type, value, className, ...props }) {
  let val = value;
  if (type === "number") {
    val = +value + "";
  }
  return (
    <input
      type={type}
      value={val}
      className={`px-4 py-2 ${className}`}
      {...props}
    />
  );
}
