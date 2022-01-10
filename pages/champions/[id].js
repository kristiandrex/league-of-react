import Head from "next/head";
import { useEffect } from "react";
import { getAllChampions, getChampion } from "@/services/champions";
import useVibrant from "@/hooks/useVibrant";
import styles from "@/styles/Champion.module.css";
import { useTheme } from "@/context/theme";

export async function getStaticPaths() {
  const champions = await getAllChampions();

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
  const champion = await getChampion(context.params.id);

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
  const color = useVibrant(champion.images[0]);
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
          <img
            src={champion.images[0]}
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
