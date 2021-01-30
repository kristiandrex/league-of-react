import { forwardRef } from "react";
import { useSelector } from "react-redux";

const ChampionDetails = forwardRef((props, ref) => {
  const champion = useSelector((state) => {
    if (state.filter !== "") {
      return state.filterChampions[state.indexActive];
    }

    return state.champions[state.indexActive];
  });

  return (
    <div className="champion-details" ref={ref}>
      <div className="card">
        <h1 className="name">{champion.name}</h1>
        <img
          className="image"
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
        />
        <p className="champion-title">{champion.title}</p>
      </div>
    </div>
  );
});

ChampionDetails.displayName = "ChampionDetails";

export default ChampionDetails;