import { createStore } from 'redux';

const initialState = {
  champions: {},
  keys: [],
  current: null,
  limit: 10,
  loaded: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      return {
        ...state,
        champions: action.payload,
        keys: Object.keys(action.payload)
      };
    }

    case 'OPEN': {
      return { ...state, current: action.payload };
    }

    case 'INCREMENT': {
      if (state.limit >= state.keys.length) {
        return { ...state, loaded: true };
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