import Thumbnail from "./Thumbnail";

function FilterChampions({ champions }) {
  const items = champions.map((champion) => (
    <Thumbnail key={champion.id} champion={champion} />
  ));

  return (
    <section className="champions">
      <div className="grid">{items}</div>
    </section>
  );
}

export default FilterChampions;
