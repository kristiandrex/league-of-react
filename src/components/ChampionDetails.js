import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChampionDetails = forwardRef((props, ref) => {
  const champion = useSelector((state) => {
    const { filter, active, filterChampions, champions } = state;

    if (filter !== "") {
      return filterChampions[active];
    }

    return champions[active];
  });

  const dispatch = useDispatch();
  const handleClose = () => dispatch({ type: "CLOSE" });

  return (
    <div className="champion-details" ref={ref}>
      <button className="btn-close" onClick={handleClose}>Cerrar</button>
      <div className="card">
        <h1 className="name">{champion.name}</h1>
        <img
          className="image"
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
          height="560"
        />
        <p className="champion-title">{champion.title}</p>
      </div>
    </div>
  );
});

ChampionDetails.displayName = "ChampionDetails";

export default ChampionDetails;