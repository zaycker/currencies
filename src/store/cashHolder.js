export const EXCHANGE_CURRENCIES = 'EXCHANGE_CURRENCIES';

export const exchangeCurrencies = (payload) => ({
  type: EXCHANGE_CURRENCIES,
  payload,
});

const ACTION_HANDLERS = {
  [EXCHANGE_CURRENCIES]: (state, { payload: { currencySource, currencyTarget, amount, rate } }) => ({
    ...state,
    [currencySource]: Math.round((state[currencySource] - amount) * 100) / 100,
    [currencyTarget]: Math.round((state[currencyTarget] + (amount * rate)) * 100) / 100,
  }),
};

export default function cashHolder(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
