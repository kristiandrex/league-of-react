import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "wouter";
import PropTypes from "prop-types";

function ChampionPreview({ champion }) {
  const version = useSelector((state) => state.version);

  return (
    <div className="champion-preview">
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
  champion: PropTypes.object.isRequired
};

function areEquals(A, B) {
  return A.champion.id === B.champion.id;
}

export default memo(ChampionPreview, areEquals);
