import { createStore } from "redux";

const initialState = {
  champions: {},
  keys: [],
  current: null,
  limit: 10,
  shouldObserve: false,
  active: -1
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      return {
        ...state,
        champions: action.payload,
        keys: Object.keys(action.payload),
        shouldObserve: true
      };
    }

    case "OPEN": {
      const { id, index } = action.payload;

      return {
        ...state,
        current: id,
        active: index
      };
    }

    case "CLOSE": {
      return { ...state, current: null };
    }

    case "INCREMENT": {
      if (state.limit >= state.keys.length) {
        return { ...state, shouldObserve: false };
      }

      return { ...state, limit: state.limit + 10 };
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