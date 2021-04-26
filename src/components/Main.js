import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "wouter";
import ChampionsList from "components/ChampionsList";
import ChampionDetails from "components/ChampionDetails";
import loadData from "services/loadData";

function Home() {
  const [matchChampion, params] = useRoute("/:champion");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: matchChampion ? "OPEN" : "CLOSE",
      payload: params?.champion
    });
  }, [dispatch, matchChampion, params]);

  useEffect(() => {
    loadData()
      .then((data) => dispatch({ type: "LOAD", payload: data }))
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <main>
      <ChampionsList />
      <ChampionDetails />
    </main>
  );
}

export default Home;
