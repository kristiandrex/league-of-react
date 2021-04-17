import { createStore } from "redux";

const initialState = {
  champions: [],
  selected: -1,
  limit: 10,
  shouldObserve: false,
  filter: "",
  filteredChampions: [],
  version: "",
};

const filterChampions = (champions, filter) => {
  return champions.filter((champion) => champion.name.toLowerCase().startsWith(filter));
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      const { champions, version } = action.payload;

      return {
        ...state,
        champions: Object.values(champions),
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
        selected: -1
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
        filteredChampions: filterChampions(state.champions, action.payload),
        selected: -1,
        shouldObserve: false,
      };
    }

    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: "",
        filteredChampions: [],
        selected: -1,
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
