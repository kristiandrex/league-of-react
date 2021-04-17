import { useSelector } from "react-redux";
import ChampionPreview from "components/ChampionPreview";
import Observer from "components/Observer";

function ChampionsList() {
  const version = useSelector((state) => state.version);

  const champions = useSelector((state) => {
    const { filter, filteredChampions, champions, limit } = state;

    if (filter.trim() !== "") {
      return filteredChampions;
    }

    return champions.slice(0, limit);
  });

  const list = champions.map((champion, index) =>
    <ChampionPreview key={champion.id} champion={champion} index={index} />
  );

  return (
    <div className="champions-list">
      <span className="version">Version: {version}</span>
      <div className="grid">{list}</div>
      <Observer />
    </div>
  );
}

export default ChampionsList;
