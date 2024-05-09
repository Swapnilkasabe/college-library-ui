import { useEffect, useRef } from "react";

// Custom debounce hook
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  // Effect to cleanup the previous timeout on re-render
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Call the debounce function
  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the new time out
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
