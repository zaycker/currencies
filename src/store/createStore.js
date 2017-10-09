import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

const createStore = (initialState = {}) => {
  const middleware = [thunk];
  let composeEnhancers = compose;

  // TODO: it is only for DEV.
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  store.asyncReducers = {};

  return store;
};

export default createStore
