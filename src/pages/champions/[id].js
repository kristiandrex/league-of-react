import Head from "next/head";

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

function Champion({ champion }) {
  return (
    <>
      <Head>
        <title>{champion.name} - League of React</title>
      </Head>
      <main>
        <span className="version">Versión: {champion.version}</span>
        <section className="champion">
          <div className="details">
            <h1 className="name">{champion.name}</h1>
            <span className="title">{champion.title}</span>
          </div>
          <div className="images">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
              alt={champion.name}
              className="vertical"
              loading="lazy"
              crossOrigin="anonymous"
            />

            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
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
