import { useState } from "react";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { useDispatch } from "react-redux";

function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (event) => {
    setValue(event.target.value);
    dispatch({ type: "FILTER", payload: event.target.value });
  };

  const onClose = () => {
    setValue("");
    dispatch({ type: "REMOVE_FILTER" });
  };

  const showClose = value.trim().length > 0;

  return (
    <div className="search-bar">
      <div className="search-box">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Buscar campeón"
          aria-label="Buscar campeón"
        />
        {
          showClose && (
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          )
        }
      </div>
    </div>
  );
}

export default Search;