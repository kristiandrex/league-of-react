import { createStore } from "redux";

const initialState = {
  champions: [],
  keys: [],
  selected: null,
  limit: 10,
  filter: "",
  filteredKeys: [],
  version: "",
};

const filterKeys = (keys, filter) => {
  return keys.filter((key) => key.toLowerCase().startsWith(filter));
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      const { champions, version } = action.payload;

      return {
        ...state,
        champions,
        keys: Object.keys(champions),
        version
      };
    }

    case "OPEN": {
      return {
        ...state,
        selected: action.payload
      };
    }

    case "CLOSE": {
      return {
        ...state,
        selected: null
      };
    }

    case "INCREMENT": {
      return {
        ...state,
        limit: state.limit + 10
      };
    }

    case "FILTER": {
      return {
        ...state,
        filter: action.payload,
        filteredKeys: filterKeys(state.keys, action.payload),
        selected: null,
      };
    }

    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: "",
        filteredKeys: [],
        selected: null,
      };
    }

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
