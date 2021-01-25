import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Observer() {
  const [inView, setInView] = useState(false);

  const onObserve = useCallback((entries) => {
    return setInView(entries[0].isIntersecting);
  }, []);

  const observer = useMemo(() => {
    return new IntersectionObserver(onObserve, { threshold: 1 });
  }, [onObserve]);

  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [observer]);

  useEffect(() => {
    if (inView) {
      dispatch({ type: "INCREMENT" });
    }
  }, [inView, dispatch]);

  return <div id="observer" ref={ref}></div>;
};

export default Observer;