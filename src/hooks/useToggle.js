import { useCallback, useState } from "react";

function useToggle(initialValue) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => {
    setState((state) => !state);
  }, []);

  return [state, toggle];
}

export default useToggle;
