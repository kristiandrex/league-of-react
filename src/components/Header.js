import { useState, forwardRef } from "react";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import Search from "components/Search";

const Header = forwardRef((props, ref) => {
  const [search, setSearch] = useState(false);
  const toggleSearch = () => setSearch((value) => !value);

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
});

Header.displayName = "Header";

export default Header;