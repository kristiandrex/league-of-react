import { forwardRef } from "react";
import { useSelector } from "react-redux";

const ChampionDetails = forwardRef((props, ref) => {
  const current = useSelector((state) => state.current);
  const champion = useSelector((state) => state.champions[current]);

  return (
    <div className="champion-details" ref={ref}>
      <div className="card">
        <h1 className="name">{champion.name}</h1>
        <img
          className="image"
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
        />
      </div>
    </div>
  );
});

ChampionDetails.displayName = "ChampionDetails";

export default ChampionDetails;