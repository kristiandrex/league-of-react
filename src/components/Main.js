import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "wouter";
import ChampionsList from "components/ChampionsList";
import ChampionDetails from "components/ChampionDetails";
import loadData from "services/loadData";

function Home() {
  const [matchDetails, params] = useRoute("/:champion");
  const dispatch = useDispatch();

  useEffect(() => {
    if (matchDetails) {
      dispatch({ type: "OPEN", payload: params.champion });
    }
  }, [dispatch, matchDetails, params]);

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
