import { useSelector } from "react-redux";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { useDispatch } from "react-redux";

function Search() {
  const value = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (event) => dispatch({ type: "FILTER", payload: event.target.value });
  const handleClose = () => dispatch({ type: "REMOVE_FILTER" });

  const showBtnClose = value.trim() !== "";

  return (
    <div className="search">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Buscar campeón"
        aria-label="Buscar campeón"
      />
      {showBtnClose && (
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default Search;
