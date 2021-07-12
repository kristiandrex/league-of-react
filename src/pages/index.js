import Head from "next/head";
import Champions from "@/components/Champions";

export async function getStaticProps() {
  const { version, champions } = require("@/public/data/latest.json");

  return {
    props: {
      version,
      champions
    }
  };
}

function Home({ version, champions }) {
  return (
    <>
      <Head>
        <title>League of React</title>
      </Head>
      <Champions version={version} champions={champions} />
    </>
  );
}

export default Home;
