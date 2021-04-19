import { useRef } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ChampionPreview from "components/ChampionPreview";
import Observer from "components/Observer";

function ChampionsList() {
  const version = useSelector((state) => state.version);
  const selected = useSelector((state) => state.selected !== null);
  const searching = useSelector((state) => state.filter !== "");
  const champions = useSelector((state) => {
    const { filter, filteredKeys, keys, limit } = state;

    if (filter.trim() !== "") {
      return filteredKeys;
    }

    return keys.slice(0, limit);
  });

  const nodeRef = useRef(null);
  const list = champions.map((id) => <ChampionPreview key={id} id={id} />);

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
