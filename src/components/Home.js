import { useEffect} from "react";
import { useDispatch } from "react-redux";
import ChampionsList from "components/ChampionsList";
import Header from "components/Header";
import { JSON_URL } from "settings";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(JSON_URL)
      .then((response) => response.json())
      .then((champions) => {
        dispatch({ type: "LOAD", payload: champions.data });
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