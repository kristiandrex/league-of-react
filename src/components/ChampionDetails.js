import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

function ChampionDetails() {
  const champion = useSelector((state) => {
    const { filter, selected, filteredChampions, champions } = state;

    if (selected === -1) {
      return null;
    }

    return filter !== "" ? filteredChampions[selected] : champions[selected];
  });

  const [storedChampion, setStoredChampion] = useState(champion);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (champion !== null) {
      setStoredChampion(champion);
    }
  }, [champion]);

  return (
    <CSSTransition
      classNames="champion-details"
      in={champion !== null}
      timeout={300}
      nodeRef={nodeRef}
      onExited={() => setStoredChampion(null)}
      unmountOnExit
    >
      <div className="champion-details" ref={nodeRef}>
        {storedChampion !== null && (
          <>
            <h1 className="name">{storedChampion.name}</h1>
            <img
              className="image"
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${storedChampion.id}_0.jpg`}
              alt={storedChampion.name}
              height="560"
            />
            <p className="champion-title">{storedChampion.title}</p>
          </>
        )}
      </div>
    </CSSTransition>
  );
}

export default ChampionDetails;
