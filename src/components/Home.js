import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChampionsList from "components/ChampionsList";
import Header from "components/Header";
import loadFullData from "util/loadData";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadFullData()
      .then((data) => {
        dispatch({ type: "LOAD", payload: data });
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <div id="app">
      <Header />
      <main>
        <ChampionsList />
      </main>
    </div>
  );
}

export default Home;