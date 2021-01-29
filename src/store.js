import { createStore } from "redux";

const initialState = {
  champions: [],
  indexActive: -1,
  limit: 10,
  shouldObserve: false,
  filter: "",
  filterChampions: []
};

const filterChampions = (champions, filter) => {
  return champions.filter((champion) => champion.name.toLowerCase().startsWith(filter));
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      return {
        ...state,
        champions: Object.values(action.payload),
        shouldObserve: true
      };
    }

    case "OPEN": {
      return {
        ...state,
        indexActive: action.payload
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
        shouldObserve: false
      };
    }

    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: "",
        filterChampions: [],
        shouldObserve: true
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