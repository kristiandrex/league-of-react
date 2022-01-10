import { memo } from "react";
import Link from "next/link";
import BadgeNew from "@/components/BagdeNew";
import styles from "@/styles/Thumbnail.module.css";

/**
 *
 * @param {{champion: IChampion}} props
 */
function Thumbnail({ champion }) {
  return (
    <div className={styles.thumbnail}>
      <Link href={`/champions/${champion.id}`}>
        <a>
          <BadgeNew show={champion.new} />
          <div style={{ overflow: "hidden" }}>
            {" "}
            <img
              src={champion.thumbnail}
              alt={champion.name}
              loading="lazy"
              width="150"
              height="150"
            />
          </div>
          <span className={styles.champion_name}>{champion.name}</span>
        </a>
      </Link>
    </div>
  );
}

export default memo(Thumbnail, (a, b) => a.champion.id === b.champion.id);
