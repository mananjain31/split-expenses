import { useState } from "react";

export default function useToggle(defValue = false) {
  const [state, setState] = useState(defValue);
  const toggleState = (val) =>
    val === undefined ? setState((s) => !s) : setState(val);
  return [state, toggleState];
}
