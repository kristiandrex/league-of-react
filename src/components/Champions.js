import { useEffect, useState } from "react";
import useObserver from "@/hooks/useObserver";
import Thumbnail from "./Thumbnail";

function Champions({ version, champions }) {
  const [limit, setLimit] = useState(10);
  const { ref, inView } = useObserver({ skip: limit >= champions.length });

  useEffect(() => {
    if (inView) {
      setLimit((limit) => limit + 10);
    }
  }, [inView]);

  const items = [];

  for (let i = 0; i < limit && i < champions.length; i++) {
    const champion = champions[i];
    items.push(<Thumbnail key={champion.id} champion={champion} />);
  }

  return (
    <main>
      <span className="version">Versión: {version}</span>
      <div className="grid">
        {items}
        <div className="observer" ref={ref}></div>
      </div>
    </main>
  );
}

export default Champions;
