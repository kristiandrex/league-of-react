import Link from "next/link";
import GithubIcon from "@/assets/github.svg";
import { useTheme } from "@/context/theme";
import styles from "@/styles/Header.module.css";

/**
 *
 * @param {{version: string}} props
 * @returns
 */
function Header({ version }) {
  const { theme } = useTheme();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} style={{ backgroundColor: theme }}>
        <Link href="/">
          <a className={styles.home_link}>League of React</a>
        </Link>
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
      </nav>
      <span className={styles.version} style={{ backgroundColor: theme }}>
        Versión: {version}
      </span>
    </header>
  );
}

export default Header;
