import { createStore } from "redux";

const initialState = {
  champions: [],
  active: -1,
  limit: 10,
  shouldObserve: false,
  filter: "",
  filterChampions: [],
  version: "",
  offset: 0
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
        active: action.payload
      };
    }

    case "CLOSE": {
      return {
        ...state,
        active: -1
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
        filterChampions: filterChampions(state.champions, action.payload),
        active: -1,
        shouldObserve: false,
      };
    }

    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: "",
        filterChampions: [],
        active: -1,
        shouldObserve: true
      };
    }

    case "STOP_OBSERVER": {
      return {
        ...state,
        shouldObserve: false
      };
    }

    case "SET_OFFSET": {
      return {
        ...state,
        offset: action.payload
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