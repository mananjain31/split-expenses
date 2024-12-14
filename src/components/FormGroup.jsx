import React from "react";

export default function FormGroup({ className, ...props }) {
  return <div className={`flex items-center gap-3 ${className}`} {...props} />;
}
