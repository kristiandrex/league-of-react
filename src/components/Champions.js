import Thumbnail from "./Thumbnail";

/**
 *
 * @param {{champions: IChampion[]}} props
 * @returns
 */
function Champions({ champions }) {
  return (
    <>
      <div className="grid">
        {champions.map((champion) => (
          <Thumbnail key={champion.id} champion={champion} />
        ))}
      </div>
    </>
  );
}

export default Champions;
