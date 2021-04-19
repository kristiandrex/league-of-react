import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "wouter";

function ChampionPreview({ id }) {
  const version = useSelector((state) => state.version);
  const champion = useSelector((state) => state.champions[id]);
  const dispatch = useDispatch();

  const handleClick = () => dispatch({ type: "OPEN", payload: id });

  return (
    <div
      className="champion-preview"
      onClick={handleClick}
    >
      <Link to={`/${champion.id}`}>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
          alt={champion.name}
          loading="lazy"
          width="150"
          height="150"
        />
        <span className="name">{champion.name}</span>
      </Link>
    </div>
  );
}

ChampionPreview.propTypes = {
  id: PropTypes.string.isRequired
};

function areEquals(A, B) {
  return A.id === B.id && A.index === B.index;
}

export default memo(ChampionPreview, areEquals);
