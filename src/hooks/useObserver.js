import { useState, useCallback, useMemo, useEffect, useRef } from "react";

function useObserver(options) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  const callback = useCallback((entries) => {
    setInView(entries[0].isIntersecting);
  }, []);

  const observer = useMemo(() => {
    return new IntersectionObserver(callback, options);
  }, [callback, options]);

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer]);

  const disconnect = useCallback(() => {
    observer.disconnect();
  }, [observer]);

  return { inView, ref, disconnect };
}

export default useObserver;
