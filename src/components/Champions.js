import { useEffect, useState } from "react";
import useObserver from "@/hooks/useObserver";
import Thumbnail from "./Thumbnail";

function Champions({ champions }) {
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
    <section className="champions">
      <div className="grid">{items}</div>
      <div className="observer" ref={ref}></div>
    </section>
  );
}

export default Champions;
