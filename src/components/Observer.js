import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useObserver from "hooks/useObserver";

function Observer() {
  const { inView, ref, disconnect } = useObserver({ threshold: 1 });
  const shouldDisconnect = useSelector((state) => state.limit >= state.keys.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      dispatch({ type: "INCREMENT" });
    }
  }, [inView, dispatch]);

  useEffect(() => {
    if (shouldDisconnect) {
      disconnect();
    }
  }, [shouldDisconnect, disconnect]);

  return <div id="observer" ref={ref}></div>;
}

export default Observer;
