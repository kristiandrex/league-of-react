import Head from "next/head";
import { useEffect } from "react";
import { useTheme } from "@/context/theme";
import styles from "@/styles/Champion.module.css";

export async function getStaticPaths() {
  const { champions } = require("@/public/data/latest.json");

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
  const { champions } = require("@/public/data/latest.json");
  const champion = champions.find(
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
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(champion.color);
  }, [setTheme, champion.color]);

  return (
    <>
      <Head>
        <title>{champion.name} - League of React</title>
      </Head>
      <main>
        <section className={styles.champion}>
          <div className={styles.details}>
            <h1 className={styles.name}>{champion.name}</h1>
            <span className={styles.title}>{champion.title}</span>
          </div>
          <div className={styles.images}>
            {champion.new && <span className="badge">NUEVO</span>}
            <img
              src={champion.images.portrait}
              alt={champion.name}
              className={styles.vertical}
              loading="lazy"
              crossOrigin="anonymous"
            />

            <img
              src={champion.images.landscape}
              alt={champion.name}
              className={styles.horizontal}
              loading="lazy"
              crossOrigin="anonymous"
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Champion;
