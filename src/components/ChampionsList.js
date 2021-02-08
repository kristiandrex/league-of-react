import { Fragment, useRef, forwardRef, useEffect, useCallback } from "react";
import { useSelector, } from "react-redux";
import PropTypes from "prop-types";

import ChampionPreview from "components/ChampionPreview";
import ChampionDetails from "components/ChampionDetails";
import Observer from "components/Observer";

const ChampionsList = forwardRef(({ previewOffset, onScroll }, offsetRef) => {
  const active = useSelector((state) => state.active);
  const version = useSelector((state) => state.version);
  const detailsRef = useRef(null);

  const champions = useSelector((state) => {
    const { filter, filterChampions, champions, limit } = state;

    if (filter.trim() !== "") {
      return filterChampions;
    }

    return champions.slice(0, limit);
  });

  const handleScrollTo = useCallback((value) => {
    window.scrollTo({ top: value, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (active !== -1) {
      const totalOffset = detailsRef.current.offsetTop - offsetRef.current.offsetHeight;

      onScroll(window.scrollY);
      handleScrollTo(totalOffset);
      return () => handleScrollTo(previewOffset);
    }
  }, [active, onScroll, previewOffset, handleScrollTo, offsetRef]);

  const shouldShowDetails = (index) => {
    if (active === -1) {
      return false;
    }

    if (index % 2 === 0 && champions.length > 1) {
      return false;
    }

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

    return <ChampionPreview key={champion.id} champion={champion} index={index} />;
  });

  return (
    <main>
      <span className="version">Version: {version}</span>
      <div className="champions-list">
        {list}
      </div>
      <Observer />
    </main>
  );
});

ChampionsList.displayName = "ChampionList";

ChampionsList.propTypes = {
  previewOffset: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired
};

export default ChampionsList;