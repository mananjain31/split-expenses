import React from "react";

export default function Label({ className, ...props }) {
  return <label className={`font-bold ${className}`} {...props} />;
}
