import { useEffect, useState } from "react";

export const useAccordian = (length) => {
  const [isAccOpen, setIsAccOpen] = useState([]);
  const [allOpen, setAllOpen] = useState(false);
  useEffect(() => {
    setIsAccOpen(Array(length).fill(false));
  }, [length]);
  useEffect(() => {
    setAllOpen((state) => {
      let allOpen = true;
      for (const openState of isAccOpen) if (!openState) allOpen = false;
      return allOpen;
    });
  }, [isAccOpen]);
  const toggleAccordian = (index) => {
    setIsAccOpen((arr) => arr.map((a, i) => (i === index ? !a : a)));
  };
  const toggleAllAccordian = () => {
    setIsAccOpen((isAccOpen) => isAccOpen.map(() => !allOpen));
  };
  return {
    isAccOpen,
    toggleAccordian,
    setIsAccOpen,
    toggleAllAccordian,
    allOpen,
  };
};
