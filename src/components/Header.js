import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";
import useToggle from "hooks/useToggle";
import Search from "components/Search";
import { ReactComponent as ArrowLeft } from "assets/arrow-left.svg";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";

function Header() {
  const [showSearch, toggleShowSearch] = useToggle(false);
  const selected = useSelector((state) => state.selected !== null);

  const dispatch = useDispatch();
  const handleClose = () => dispatch({ type: "CLOSE" });

  return (
    <header>
      <nav>
        {selected && (
          <Link href="/" onClick={handleClose}>
            <a aria-label="Volver">
              <ArrowLeft />
            </a>
          </Link>
        )}
        <a href="/" className="home-link">
          League of React
        </a>
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
          {!selected && (
            <button
              aria-label="Buscar"
              onClick={toggleShowSearch}
            >
              <SearchIcon />
            </button>
          )}
        </div>
      </nav>
      {showSearch && !selected && <Search />}
    </header>
  );
}

export default Header;
