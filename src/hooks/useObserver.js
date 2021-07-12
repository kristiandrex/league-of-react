import { useState, useCallback, useEffect, useRef } from "react";

function useObserver(options) {
  const [inView, setInView] = useState(false);
  const element = useRef();
  const observer = useRef();

  useEffect(() => {
    const { skip, ...restOptions } = options;

    if (skip) {
      return;
    }

    const callback = (entries) => {
      setInView(entries[0].isIntersecting);
    };

    observer.current = new IntersectionObserver(callback, restOptions);
    observer.current.observe(element.current);
    return () => observer.current.disconnect();
  }, [options]);

  const disconnect = useCallback(() => {
    observer.current?.disconnect();
  }, []);

  return {
    inView,
    ref: element,
    disconnect
  };
}

export default useObserver;
