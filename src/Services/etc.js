import { useEffect, useState } from "react";

export function useDebounce(value, delay = 1000) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

//generate color between red and green for input value
export function colorMapGenerator(value) {
  //generalize value
  let generalizedValue = value / 1.5;
  if (generalizedValue > 1) {
    generalizedValue = 1;
  } else if (generalizedValue < 0) {
    generalizedValue = 0;
  }
  //generate color
  // Return a CSS HSL string
  return "hsl(" + 120 * generalizedValue + ", 100%, 38%)";
}
