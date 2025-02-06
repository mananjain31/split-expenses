import React from "react";

export default function Input({ label, type, value, className, ...props }) {
  let val = value;
  if (type === "number") {
    val = +value + "";
  }

  return (
    <span className="flex flex-col items-start">
      {label && (
        <label
          htmlFor={props.id}
          className="block mb-1  text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        placeholder="John"
        required
        type={type}
        value={val}
        className={`md:min-w-60 min-h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        {...props}
      />
    </span>
  );
}
