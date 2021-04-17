import { useCallback, useState } from "react";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { useDispatch } from "react-redux";

function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onChange = useCallback((event) => {
    const newValue = event.target.value;

    setValue(newValue);
    dispatch({ type: "FILTER", payload: newValue });
  }, [dispatch]);

  const onClose = useCallback(() => {
    setValue("");
    dispatch({ type: "REMOVE_FILTER" });
  }, [dispatch]);

  const showClose = value.trim() !== "";

  return (
    <div className="search hide-on-selected">
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
  );
}

export default Search;
