import Head from "next/head";
import Image from "next/image";
import * as Vibrant from "node-vibrant";

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
  const handleLoad = (event) => {
    Vibrant.from(event.target.src)
      .getPalette()
      .then((palette) => console.log(palette.Vibrant.getHex()))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <title>{champion.name} - League of React</title>
      </Head>
      <div className="details">
        <h1 className="name">{champion.name}</h1>
        <span className="title">{champion.title}</span>
        <Image
          className="image"
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
          height="560"
          crossOrigin="anonymous"
          onLoad={handleLoad}
        />
      </div>
    </>
  );
}

export default Champion;
