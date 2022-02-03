import { useRef } from "react";
import SearchIcon from "@/assets/search.svg";
import styles from "@/styles/Search.module.css";

function Search({ onChange }) {
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = inputRef.current.value.trim().toLowerCase();
    onChange(search);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input type="text" placeholder="Search..." ref={inputRef} />
      <button type="submit" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  );
}

export default Search;
