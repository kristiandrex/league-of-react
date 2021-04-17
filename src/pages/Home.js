import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChampionsList from "components/ChampionsList";
import Header from "components/Header";
import loadData from "services/loadData";
import ChampionDetails from "components/ChampionDetails";

function Home() {
  const dispatch = useDispatch();
  const isChampionSelected = useSelector((state) => state.selected !== -1);

  useEffect(() => {
    loadData()
      .then((data) => {
        dispatch({ type: "LOAD", payload: data });
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <div id="app" className={isChampionSelected ? "show-details" : "hide-details"}>
      <Header />
      <main>
        <ChampionsList />
        <ChampionDetails />
      </main>
    </div>
  );
}

export default Home;
