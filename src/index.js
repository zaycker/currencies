import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import createStore from 'store/createStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
  cashHolder: {
    USD: 223.56,
    EUR: 150.44,
    GBP: 86.45,
  },
  exchange: {
    currencySource: 'USD',
    currencyTarget: 'USD',
  }
};

const store = createStore(window.__INITIAL_STATE__ || initialState);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
