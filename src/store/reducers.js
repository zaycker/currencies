import { combineReducers } from 'redux';

import rates from './rates';
import cashHolder from './cashHolder';
import exchange from './exchange';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    rates,
    cashHolder,
    exchange,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
