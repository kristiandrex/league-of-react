import { createStore } from "redux";

const initialState = {
  champions: [],
  selected: null,
  filter: "",
  filteredChampions: [],
  limit: 10,
  version: ""
};

function filterChampions(champions, filter) {
  return champions.filter((champion) => champion.name.toLowerCase().startsWith(filter));
}

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      const { champions, version } = action.payload;

      return {
        ...state,
        champions,
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
        filteredChampions: filterChampions(state.champions, action.payload),
        selected: null,
      };
    }

    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: "",
        filteredChampions: [],
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);

export default store;
