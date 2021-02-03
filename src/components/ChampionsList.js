import { Fragment } from "react";
import { useSelector } from "react-redux";
import ChampionPreview from "components/ChampionPreview";
import ChampionDetails from "components/ChampionDetails";
import Observer from "components/Observer";

function ChampionsList() {
  const champions = useSelector((state) => {
    if (state.filter.trim() !== "") {
      return state.filterChampions;
    }

    return state.champions.slice(0, state.limit);
  });

  const active = useSelector((state) => state.active);

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
          <ChampionDetails />
        </Fragment>
      );
    }

    return (
      <ChampionPreview key={champion.id} champion={champion} index={index} />
    );
  });

  return (
    <main>
      <div className="champions-list">
        {list}
      </div>
      <Observer />
    </main>
  );
}

export default ChampionsList;