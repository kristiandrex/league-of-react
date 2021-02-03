import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChampionsList from "components/ChampionsList";
import loadData from "services/loadData";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadData()
      .then((data) => {
        dispatch({ type: "LOAD", payload: data });
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  return <ChampionsList />;
}

export default Home;