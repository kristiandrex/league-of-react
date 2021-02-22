import { Fragment, useRef, useEffect, useState } from "react";
import { useSelector, } from "react-redux";

import ChampionPreview from "components/ChampionPreview";
import ChampionDetails from "components/ChampionDetails";
import Observer from "components/Observer";

function ChampionsList() {
  const [previewOffset, setPreviewOffset] = useState(0);
  const detailsRef = useRef(null);

  const active = useSelector((state) => state.active);
  const version = useSelector((state) => state.version);
  const offset = useSelector((state) => state.offset);

  const champions = useSelector((state) => {
    const { filter, filterChampions, champions, limit } = state;

    if (filter.trim() !== "") {
      return filterChampions;
    }

    return champions.slice(0, limit);
  });

  /**
   * Scroll to the details of the selected champion.
   * When closing the details return to the previous offset.
   * @param {number} offset - <nav> size.
   */
  useEffect(() => {
    if (active !== -1) {
      const totalOffset = detailsRef.current.offsetTop - offset;

      setPreviewOffset(window.scrollY);
      window.scrollTo({ top: totalOffset, behavior: "smooth" });

      return () => window.scrollTo({ top: previewOffset, behavior: "smooth" });
    }
  }, [active, previewOffset, offset]);

  /**
   * Show the details of the selected champion in the correct position following the column layout.
   * @param {number} index
   * @returns {boolean} Show the details of the selected champion in the current position.
   */
  const shouldShowDetails = (index) => {
    if (active === -1) {
      return false;
    }

    /**
     * There is more than one champion and the selected one is in the left column.
     */
    if (index % 2 === 0 && champions.length > 1) {
      return false;
    }

    /**
     * This index and the following are different from the selected champion.
     */
    if (index !== active && index !== active + 1) {
      return false;
    }

    return true;
  };

  const list = champions.map((champion, index) => {
    if (shouldShowDetails(index)) {
      return (
        <Fragment key={champion.id}>
          <ChampionPreview champion={champion} index={index} />
          <ChampionDetails ref={detailsRef} />
        </Fragment>
      );
    }

    return (
      <ChampionPreview key={champion.id} champion={champion} index={index} />
    );
  });

  return (
    <main>
      <span className="version">Version: {version}</span>
      <div className="champions-list">{list}</div>
      <Observer />
    </main>
  );
};

export default ChampionsList;