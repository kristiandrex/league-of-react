import { useEffect, useState } from "react";
import { getColumnCount } from "@/utils";

function useColumnCount(ref) {
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(getColumnCount(ref.current));
    };

    updateColumns();

    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [ref]);

  return columnCount;
}

export default useColumnCount;
