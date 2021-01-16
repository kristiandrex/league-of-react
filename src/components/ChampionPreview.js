import { memo } from 'react';
import { PREVIEW_URL } from 'settings';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ChampionPreview({ id }) {
  const champion = useSelector((state) => state.champions[id]);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: 'OPEN', payload: id });
  };

  return (
    <div className='champion-preview' onClick={onClick}>
      <img src={`${PREVIEW_URL}/${champion.image.full}`} alt={champion.name} />
      <div className="name">{champion.name}</div>
    </div>
  );
}

ChampionPreview.propTypes = {
  id: PropTypes.string.isRequired
};

function areEquals(prevProps, nextProps) {
  return prevProps.id === nextProps.id;
}

export default memo(ChampionPreview, areEquals);