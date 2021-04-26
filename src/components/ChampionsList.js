import { useRef } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ChampionPreview from "components/ChampionPreview";
import Observer from "components/Observer";

function ChampionsList() {
  const version = useSelector((state) => state.version);
  const selected = useSelector((state) => state.selected !== null);
  const searching = useSelector((state) => state.filter.trim() !== "");
  const champions = useSelector((state) => {
    const { champions, filter, filteredChampions, limit } = state;
    return filter.trim() !== "" ? filteredChampions : champions.slice(0, limit);
  });

  const nodeRef = useRef(null);
  const list = champions.map((champion) => (
    <ChampionPreview key={champion.id} champion={champion} />
  ));

  return (
    <CSSTransition
      classNames="champions-list"
      in={!selected}
      timeout={300}
      nodeRef={nodeRef}
    >
      <div className="champions-list" ref={nodeRef}>
        <span className="version">Version: {version}</span>
        <div className="grid">{list}</div>
        {!searching && <Observer />}
      </div>
    </CSSTransition>
  );
}

export default ChampionsList;
