import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ChampionPreview from 'components/ChampionPreview';
import { JSON_URL } from 'settings';
import { useDispatch, useSelector } from 'react-redux';

function ChampionsList() {
  const limit = useSelector((state) => state.limit);
  const keys = useSelector((state) => state.keys);
  const loaded = useSelector((state) => state.loaded);

  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const lazyKeys = useMemo(() => {
    return keys.slice(0, limit);
  }, [limit, keys]);

  const onObserve = useCallback((entries) => {
    setInView(entries[0].isIntersecting);
  }, []);

  const observer = useMemo(() => {
    return new IntersectionObserver(onObserve, { threshold: 1 });
  }, [onObserve]);

  useEffect(() => {
    fetch(JSON_URL)
      .then((response) => response.json())
      .then((champions) => {
        dispatch({ type: 'LOAD', payload: champions.data });
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (loaded) {
      return;
    }

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [loading, observer, loaded]);

  useEffect(() => {
    if (inView) {
      dispatch({ type: 'INCREMENT' });
    }
  }, [inView, dispatch]);

  return (
    <>
      <div className="champions-list">
        {lazyKeys.map((key) => (
          <ChampionPreview key={key} id={key} />
        ))}
      </div>
      {!loading && <div id="observer" ref={ref}></div>}
    </>
  );

}

export default ChampionsList;