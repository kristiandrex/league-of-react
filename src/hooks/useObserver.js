import { useState, useCallback, useEffect, useRef } from "react";

function useObserver(options) {
  const elementRef = useRef();
  const observerRef = useRef();
  const [inView, setInView] = useState(false);

  const callback = useCallback((entries) => {
    setInView(entries[0].isIntersecting);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    observerRef.current.observe(elementRef.current);
    return () => observerRef.current.disconnect();
  }, [callback, options]);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  return {
    inView,
    ref: elementRef,
    disconnect
  };
}

export default useObserver;
