import Head from "next/head";
import { useEffect } from "react";
import useVibrant from "@/hooks/useVibrant";

import { useTheme } from "@/context/theme";
import BadgeNew from "@/components/BagdeNew";
import styles from "@/styles/Champion.module.css";

import patch from "public/data/patch.json";

export async function getStaticPaths() {
  const { champions } = patch;

  const paths = champions.map((champion) => ({
    params: {
      id: champion.id
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const champion = patch.champions.find(
    (champion) => champion.id === context.params.id
  );

  return {
    props: {
      champion
    }
  };
}

/**
 *
 * @param {{champion: IChampion}} props
 * @returns
 */
function Champion({ champion }) {
  const color = useVibrant(champion.skins[0].url);
  const { setTheme } = useTheme();

  useEffect(() => {
    color && setTheme(color);
  }, [color, setTheme]);

  return (
    <>
      <Head>
        <title>{champion.name} - League of React</title>
      </Head>
      <main className={styles.champion}>
        <div className={styles.splash_art}>
          <div className={styles.overlay}></div>
          <BadgeNew show={champion.new} />
          <img
            src={champion.skins[0].url}
            alt={champion.name}
            crossOrigin="anonymous"
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.name}>{champion.name}</h1>
          <h2 className={styles.title}>{champion.title}</h2>
          <p className={styles.lore}>{champion.lore}</p>
        </div>
      </main>
    </>
  );
}

export default Champion;
