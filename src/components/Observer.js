import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Observer() {
  const [inView, setInView] = useState(false);
  const shouldObserve = useSelector((state) => state.shouldObserve);
  const shouldStop = useSelector((state) => state.limit >= state.champions.length);

  const onObserve = useCallback((entries) => setInView(entries[0].isIntersecting), []);
  const observer = useMemo(() => new IntersectionObserver(onObserve, { threshold: 1 }), [onObserve]);

  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldObserve) {
      return;
    }

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, shouldObserve]);

  useEffect(() => {
    if (inView) {
      if (shouldStop) {
        return dispatch({ type: "STOP_OBSERVER" });
      }

      dispatch({ type: "INCREMENT" });
    }
  }, [inView, shouldStop, dispatch]);

  return <div id="observer" ref={ref}></div>;
};

export default Observer;