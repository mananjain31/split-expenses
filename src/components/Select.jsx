import React from "react";

export default function Select({
  label,
  className,
  options,
  value,
  onChange,
  ...props
}) {
  return (
    <span className="flex flex-col items-start">
      {label && (
        <label
          htmlFor={props.id}
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        className={`min-w-60 min-h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        // className={`px-4 py-2 border-r-8 border-transparent ${className}`}
        value={value}
        onChange={onChange}
      >
        <option value={" "}>Select</option>
        {options.map((opt /*[key,value]*/) => (
          <option key={opt[0]} value={opt[0]}>
            {opt[1]}
          </option>
        ))}
      </select>
    </span>
  );
}
