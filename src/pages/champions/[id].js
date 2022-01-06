import Head from "next/head";
import { useEffect } from "react";
import { useTheme } from "@/context/theme";

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
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(champion.color);
  }, [setTheme, champion.color]);

  return (
    <>
      <Head>
        <title>{champion.name} - League of React</title>
      </Head>
      <main>
        <span className="version" style={{ backgroundColor: theme }}>
          Versión: {champion.version}
        </span>
        <section className="champion">
          <div className="details">
            <h1 className="name">{champion.name}</h1>
            <span className="title">{champion.title}</span>
          </div>
          <div className="images">
            {champion.new && <span className="badge">NUEVO</span>}
            <img
              src={champion.images.portrait}
              alt={champion.name}
              className="vertical"
              loading="lazy"
              crossOrigin="anonymous"
            />

            <img
              src={champion.images.landscape}
              alt={champion.name}
              className="horizontal"
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
