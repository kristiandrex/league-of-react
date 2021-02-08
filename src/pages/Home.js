import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ChampionsList from "components/ChampionsList";
import loadData from "services/loadData";
import Header from "components/Header";

function Home() {
  const dispatch = useDispatch();
  const offsetRef = useRef(null);

  const [previewOffset, setPreviewOffset] = useState(0);
  const handleScroll = (value) => setPreviewOffset(value);

  useEffect(() => {
    loadData()
      .then((data) => {
        dispatch({ type: "LOAD", payload: data });
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <>
      <Header ref={offsetRef} />
      <ChampionsList
        ref={offsetRef}
        previewOffset={previewOffset}
        onScroll={handleScroll}
      />
    </>
  );
}

export default Home;