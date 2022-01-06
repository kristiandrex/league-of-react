import Link from "next/link";
import GithubIcon from "@/assets/github.svg";
import { useTheme } from "@/context/theme";

function Header() {
  const { theme } = useTheme();

  return (
    <nav style={{ backgroundColor: theme }}>
      <Link href="/">
        <a className="home-link">League of React</a>
      </Link>
      <div className="items">
        <Link href="https://github.com/kristiandrex/league-of-react">
          <a
            className="github-link"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Github repository"
          >
            <GithubIcon />
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
