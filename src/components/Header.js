import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useToggle from "hooks/useToggle";
import { ReactComponent as ArrowLeft } from "assets/arrow-left.svg";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import Search from "components/Search";

function Header() {
  const [showSearch, toggleShowSearch] = useToggle(false);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, [dispatch]);

  return (
    <header>
      <nav>
        <button
          className="show-on-selected"
          onClick={handleClose}
          aria-label="Volver"
        >
          <ArrowLeft />
        </button>
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
            className="hide-on-selected"
            aria-label="Buscar"
            onClick={toggleShowSearch}
          >
            <SearchIcon />
          </button>
        </div>
      </nav>
      {showSearch && <Search />}
    </header>
  );
}

export default Header;
