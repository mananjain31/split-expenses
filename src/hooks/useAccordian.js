import { useEffect, useState } from "react";

export const useAccordian = (length) => {
  const [isAccOpen, setIsAccOpen] = useState([]);
  useEffect(() => {
    setIsAccOpen(Array(length).fill(false));
  }, [length]);
  const toggleAccordian = (index) => {
    setIsAccOpen((arr) => arr.map((a, i) => (i === index ? !a : a)));
  };
  return [isAccOpen, toggleAccordian, setIsAccOpen];
};
