import { memo, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

function ChampionPreview({ champion, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const onClick = () => dispatch({
    type: "OPEN",
    payload: index
  });

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
  champion: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

function areEquals(A, B) {
  return A.champion.id === B.champion.id && A.index === B.index;
}

export default memo(ChampionPreview, areEquals);