export const FETCH_RATES_PENDING = 'FETCH_RATES_PENDING';
export const FETCH_RATES_SUCCESS = 'FETCH_RATES_SUCCESS';

export const fetchRates = () => async (dispatch) => {
  dispatch({
    type: FETCH_RATES_PENDING,
  });

  try {
    const url = 'http://cors-proxy.htmldriven.com/?url=http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
    const response = await fetch(url);
    const json = await response.json();

    if (response.status < 200 || response.status > 300 || !json.body) {
      throw Error(json);
    }

    const parser = new DOMParser();
    const xml = parser.parseFromString(json.body, 'application/xml');
    const rates = {
      EUR: 1,
    };

    xml.querySelectorAll('Cube[currency]').forEach(node =>
      rates[node.getAttribute('currency')] = parseFloat(node.getAttribute('rate')));

    dispatch({
      type: FETCH_RATES_SUCCESS,
      payload: rates,
    });
  } catch (e) {
    console.log(e);
  }
};

export const startFetchIntervaled = () => (dispatch) => {
  dispatch(fetchRates());
  setInterval(() => dispatch(fetchRates()), 10e3);
};

const ACTION_HANDLERS = {
  [FETCH_RATES_SUCCESS]: (_, action) => action.payload,
};

const initialState = {};

export default function ratesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
