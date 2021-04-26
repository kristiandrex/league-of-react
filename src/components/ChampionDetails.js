import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

function ChampionDetails() {
  const champion = useSelector((state) => {
    const { selected, champions } = state;
    return champions.find((champion) => champion.id === selected);
  });

  const [storedChampion, setStoredChampion] = useState(champion);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (champion !== undefined) {
      setStoredChampion(champion);
    }
  }, [champion]);

  return (
    <CSSTransition
      classNames="champion-details"
      in={champion !== undefined}
      timeout={300}
      nodeRef={nodeRef}
      onExited={() => setStoredChampion(null)}
      unmountOnExit
    >
      <div className="champion-details" ref={nodeRef}>
        {storedChampion && (
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
