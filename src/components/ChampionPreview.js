import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

function ChampionPreview({ id, index }) {
  const champion = useSelector(
    (state) => state.champions[id],
    (A, B) => A.id === B.id
  );

  const ref = useRef(null);
  const dispatch = useDispatch();
  const onClick = () => dispatch({ type: "OPEN", payload: { id, index } });

  return (
    <>
      <div
        className="champion-preview"
        onClick={onClick}
        ref={ref}
      >
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${champion.image.full}`}
          alt={champion.name}
          loading="lazy"
        />
        <span className="name">{champion.name}</span>
      </div>
    </>
  );
}

ChampionPreview.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default ChampionPreview;