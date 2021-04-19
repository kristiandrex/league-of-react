import { createStore } from "redux";

const initialState = {
  champions: [],
  keys: [],
  selected: null,
  limit: 10,
  shouldObserve: false,
  filter: "",
  filteredChampions: [],
  version: "",
};

const filterChampions = (keys, filter) => {
  return keys.filter((key) => key.toLowerCase().startsWith(filter));
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      const { champions, version } = action.payload;

      return {
        ...state,
        champions: champions,
        keys: Object.keys(champions),
        shouldObserve: true,
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
        filteredChampions: filterChampions(state.keys, action.payload),
        selected: null,
        shouldObserve: false,
      };
    }

    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: "",
        filteredChampions: [],
        selected: null,
        shouldObserve: true
      };
    }

    case "STOP_OBSERVER": {
      return {
        ...state,
        shouldObserve: false
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
