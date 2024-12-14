import React from "react";

export default function Select({ className, options, value, onChange }) {
  return (
    <select
      className={`px-4 py-2 border-r-8 border-transparent ${className}`}
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
  );
}
