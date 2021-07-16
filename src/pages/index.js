import { useEffect, useState } from "react";
import Head from "next/head";
import Champions from "@/components/Champions";

import { useRouter } from "next/dist/client/router";
import Search from "@/components/Search";

export async function getStaticProps() {
  const { version, champions } = require("@/public/data/latest.json");

  return {
    props: {
      version,
      initialChampions: champions
    }
  };
}

function Home({ version, initialChampions }) {
  const [champions, setChampions] = useState(initialChampions);
  const router = useRouter();

  useEffect(() => {
    const search = router.query.search;

    if (!search) {
      return setChampions(initialChampions);
    }

    const filter = initialChampions.filter((champion) =>
      champion.name.toLowerCase().startsWith(search)
    );

    setChampions(filter);
  }, [router.query.search, initialChampions]);

  const handleSearch = (value) => {
    router.push({
      pathname: "/",
      query: {
        search: value
      }
    });
  };

  return (
    <>
      <Head>
        <title>League of React</title>
      </Head>
      <main>
        <Search onChange={handleSearch} />
        <span className="version">Versión: {version}</span>
        <Champions champions={champions} />
      </main>
    </>
  );
}

export default Home;
