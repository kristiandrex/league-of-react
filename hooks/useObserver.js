//Inspired by: https://github.com/midudev/react-live-coding/blob/master/src/hooks/useNearScreen.js

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Intersection Observer hook
 * @param {ObserverOptions} options
 * @returns
 */
function useObserver(options = {}) {
  const [inView, setInView] = useState(false);
  const internalRef = useRef();
  const observer = useRef();

  useEffect(() => {
    const { externalRef, skip, ...restOptions } = options;

    if (skip) {
      observer.current?.disconnect();
      return;
    }

    const ref = externalRef ? externalRef : internalRef;

    const callback = (entries) => {
      setInView(entries[0].isIntersecting);
    };

    observer.current = new IntersectionObserver(callback, restOptions);
    observer.current.observe(ref.current);
    return () => observer.current.disconnect();
  }, [options]);

  const disconnect = useCallback(() => {
    observer.current?.disconnect();
  }, []);

  return {
    inView,
    ref: internalRef,
    disconnect
  };
}

export default useObserver;
