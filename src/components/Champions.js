import { useEffect, useRef, useState } from "react";
import { chunckChampions } from "@/utils";
import useObserver from "@/hooks/useObserver";
import useColumnCount from "@/hooks/useColumnCount";

/**
 *
 * @param {{champions: IChampion[], skip?:boolean}} props
 * @returns
 */
function Champions({ champions, skip }) {
  const gridRef = useRef();
  const columnCount = useColumnCount(gridRef);
  const [chunkSize, setChunkSize] = useState(0);

  skip = skip || chunkSize >= champions.length;

  const { inView, ref: observerRef } = useObserver({
    skip,
    rootMargin: "150px"
  });

  useEffect(() => {
    setChunkSize((chunk) => {
      if (chunk === 0) {
        return columnCount * 4;
      }

      return Math.ceil(chunk / columnCount) * columnCount;
    });
  }, [columnCount]);

  useEffect(() => {
    if (inView) {
      setChunkSize((chunk) => chunk + columnCount);
    }
  }, [inView, columnCount]);

  const items = chunckChampions(champions, chunkSize);

  return (
    <section className="champions">
      <div className="grid" ref={gridRef}>
        {items}
      </div>
      <div id="observer" ref={observerRef}></div>
    </section>
  );
}

export default Champions;
