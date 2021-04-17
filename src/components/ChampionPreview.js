import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

function ChampionPreview({ champion, index }) {
  const version = useSelector((state) => state.version);
  const dispatch = useDispatch();
  const handleClick = useCallback(
    () => dispatch({ type: "OPEN", payload: index }),
    [dispatch, index]
  );

  return (
    <div
      className="champion-preview"
      onClick={handleClick}
    >
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
        alt={champion.name}
        loading="lazy"
        width="150"
        height="150"
      />
      <span className="name">{champion.name}</span>
    </div>
  );
}

ChampionPreview.propTypes = {
  champion: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

function areEquals(A, B) {
  return A.champion.id === B.champion.id && A.index === B.index;
}

export default memo(ChampionPreview, areEquals);
