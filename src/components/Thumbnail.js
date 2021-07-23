import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

function Thumbnail({ champion }) {
  return (
    <div className="thumbnail">
      <Link href={`/champions/${champion.id}`}>
        <a>
          {champion.new && <span className="badge">NUEVO</span>}
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.image.full}`}
            alt={champion.name}
            loading="lazy"
            width="150"
            height="150"
          />
          <span className="name">{champion.name}</span>
        </a>
      </Link>
    </div>
  );
}

export default memo(Thumbnail, (a, b) => a.champion.name === b.champion.name);
