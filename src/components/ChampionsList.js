import { Fragment } from "react";
import { useSelector } from "react-redux";
import ChampionPreview from "components/ChampionPreview";
import ChampionDetails from "components/ChampionDetails";
import Observer from "components/Observer";

function ChampionsList() {
  const champions = useSelector((state) => {
    if (state.filter !== "") {
      return state.filterChampions;
    }

    return state.champions.slice(0, state.limit);
  });

  const indexActive = useSelector((state) => state.indexActive);

  const isRight = (index) => index % 2 !== 0;
  const isThisOrNext = (index, active) => index === active || index === active + 1;

  const list = champions.map((champion, index) => {
    if (isRight(index) && isThisOrNext(index, indexActive)) {
      return (
        <Fragment key={champion.id}>
          <ChampionPreview champion={champion} index={index} />
          <ChampionDetails />
        </Fragment>
      );
    }

    return <ChampionPreview key={champion.id} champion={champion} index={index} />;
  });

  return (
    <>
      <div className="champions-list">
        {list}
      </div>
      <Observer />
    </>
  );
}

export default ChampionsList;