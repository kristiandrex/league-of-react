import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Observer() {
  const [inView, setInView] = useState(false);
  const shouldObserve = useSelector((state) => state.shouldObserve);
  const shouldDisconnect = useSelector((state) => state.limit >= state.champions.length);

  const callback = useCallback((entries) => {
    setInView(entries[0].isIntersecting);
  }, []);

  const observer = useMemo(() => {
    return new IntersectionObserver(callback, { threshold: 1 });
  }, [callback]);

  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldObserve) {
      return;
    }

    if (shouldDisconnect) {
      observer.disconnect();
    }

    observer.observe(ref.current);
  }, [observer, shouldObserve, shouldDisconnect]);

  useEffect(() => {
    if (inView) {
      dispatch({ type: "INCREMENT" });
    }
  }, [inView, dispatch]);

  return <div id="observer" ref={ref}></div>;
}

export default Observer;
