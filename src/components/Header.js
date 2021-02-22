import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import Search from "components/Search";

function Header() {
  const [search, setSearch] = useState(false);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const toggleSearch = () => setSearch((value) => !value);

  useEffect(() => {
    dispatch({
      type: "SET_OFFSET",
      payload: ref.current.offsetHeight
    });
  }, [dispatch]);

  return (
    <header>
      <nav ref={ref}>
        <a href="/" className="home-link">League of React</a>
        <div className="items">
          <a
            href="https://github.com/kristiandrex/league-of-react"
            target="_blank"
            rel="noreferrer"
            className="github-link"
            aria-label="Github"
          >
            <GithubIcon className="github-icon" />
          </a>
          <button
            onClick={toggleSearch}
            className="search-btn"
            aria-label="Buscar"
          >
            <SearchIcon className="search-icon" />
          </button>
        </div>
      </nav>
      {search && <Search />}
    </header>
  );
};

export default Header;