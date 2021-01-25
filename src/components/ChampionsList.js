import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChampionPreview from "components/ChampionPreview";
import ChampionDetails from "components/ChampionDetails";
import Observer from "components/Observer";

const HEADER_SIZE = 75;

function ChampionsList() {
  const active = useSelector((state) => state.active);
  const shouldObserve = useSelector((state) => state.shouldObserve);
  const keys = useSelector(
    (state) => state.keys.slice(0, state.limit),
    (A, B) => A.length === B.length
  );

  const detailsRef = useRef(null);

  useEffect(() => {
    if (active !== -1) {
      window.scrollTo({
        top: detailsRef.current.offsetTop - HEADER_SIZE,
        behavior: "smooth",
      });
    }
  }, [active]);

  const isRight = (i) => i % 2 !== 0;
  const isThisOrNext = (i, active) => i === active || i === active + 1;

  const list = keys.map((key, index) => {
    if (isRight(index) && isThisOrNext(index, active)) {
      return (
        <Fragment key={key}>
          <ChampionPreview id={key} index={index} />
          <ChampionDetails ref={detailsRef} />
        </Fragment>
      );
    }

    return <ChampionPreview key={key} id={key} index={index} />;
  });

  return (
    <>
      <div className="champions-list">
        {list}
      </div>
      {shouldObserve && <Observer />}
    </>
  );
}

export default ChampionsList;