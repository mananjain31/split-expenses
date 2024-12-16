import { useState } from "react";

export default function useToggle(defValue = false) {
  const [state, setState] = useState(defValue);
  const toggleState = (val) =>
    typeof val !== "boolean" ? setState((s) => !s) : setState(val);
  return [state, toggleState];
}
