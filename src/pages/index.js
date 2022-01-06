import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Champions from "@/components/Champions";
import Search from "@/components/Search";
import FilterChampions from "@/components/FilterChampions";
import { useTheme } from "@/context/theme";

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
  const { setTheme } = useTheme();

  const search = router.query.search;

  useEffect(() => {
    setTheme();

    if (!search) {
      return setChampions(initialChampions);
    }

    const filter = initialChampions.filter((champion) =>
      champion.name.toLowerCase().startsWith(search)
    );

    setChampions(filter);
  }, [search, initialChampions, setTheme]);

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
        {search ? (
          <FilterChampions champions={champions} />
        ) : (
          <Champions champions={champions} />
        )}
      </main>
    </>
  );
}

export default Home;
