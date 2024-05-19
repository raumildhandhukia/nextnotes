import { useRef, useEffect } from "react";

function useThrottle(callback: Function, delay: number) {
  const timeoutRef = useRef<any>(null);
  let shouldWait = false;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const throttledCallback = (...args: any[]) => {
    if (shouldWait) {
      return;
    }
    callback(...args);
    shouldWait = true;

    timeoutRef.current = setTimeout(() => {
      shouldWait = false;
    }, delay);
  };

  return throttledCallback;
}

export default useThrottle;
