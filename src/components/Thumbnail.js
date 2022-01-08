import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Thumbnail.module.css";

/**
 *
 * @param {{champion: IChampion}} props
 */
function Thumbnail({ champion }) {
  const [loading, setLoading] = useState(true);
  const [imgSize, setImgSize] = useState(150);
  const imgRef = useRef();

  const handleLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    setImgSize(imgRef.current?.width || 150);
  }, []);

  return (
    <div className={styles.thumbnail}>
      <Link href={`/champions/${champion.id}`}>
        <a>
          {loading && (
            <span
              className={styles.skeleton}
              style={{ width: imgSize, height: imgSize }}
            ></span>
          )}
          {champion.new && <span className="badge">NUEVO</span>}
          <img
            src={champion.images.thumbnail}
            alt={champion.name}
            loading="lazy"
            width="150"
            height="150"
            onLoad={handleLoad}
            ref={imgRef}
          />
          <span className={styles.champion_name}>{champion.name}</span>
        </a>
      </Link>
    </div>
  );
}

export default memo(Thumbnail, (a, b) => a.champion.name === b.champion.name);
