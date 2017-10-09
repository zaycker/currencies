export const EXCHANGE_AMOUNT_CHANGE = 'EXCHANGE_AMOUNT_CHANGE';
export const EXCHANGE_CURRENCY_SOURCE_CHANGE = 'EXCHANGE_CURRENCY_SOURCE_CHANGE';
export const EXCHANGE_CURRENCY_TARGET_CHANGE = 'EXCHANGE_CURRENCY_TARGET_CHANGE';

export const setExchangeAmount = (amount) => ({
  type: EXCHANGE_AMOUNT_CHANGE,
  payload: amount,
});

export const setSourceCurrency = (currency) => ({
  type: EXCHANGE_CURRENCY_SOURCE_CHANGE,
  payload: currency,
});

export const setTargetCurrency = (currency) => ({
  type: EXCHANGE_CURRENCY_TARGET_CHANGE,
  payload: currency,
});

const ACTION_HANDLERS = {
  [EXCHANGE_AMOUNT_CHANGE]: (state, action) => ({
    ...state,
    amount: parseFloat(action.payload),
    amountString: action.payload,
  }),
  [EXCHANGE_CURRENCY_SOURCE_CHANGE]: (state, action) => ({
    ...state,
    currencySource: action.payload,
  }),
  [EXCHANGE_CURRENCY_TARGET_CHANGE]: (state, action) => ({
    ...state,
    currencyTarget: action.payload,
  }),
};

export default function cashHolder(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
