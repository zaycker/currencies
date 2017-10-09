import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { startFetchIntervaled } from 'store/rates';
import {
  setExchangeAmount,
  setSourceCurrency,
  setTargetCurrency,
} from 'store/exchange';
import { exchangeCurrencies } from 'store/cashHolder';
import CurrencySource from 'components/CurrencySource';
import CurrencyTarget from 'components/CurrencyTarget';
import SlideSelect from 'components/SlideSelect';
import styles from './styles.css';

const mapDispatchToProps = {
  startFetchIntervaled,
  setExchangeAmount,
  setSourceCurrency,
  setTargetCurrency,
  exchangeCurrencies,
};

const mapStateToProps = ({ rates, cashHolder, exchange }) => ({
  rates,
  cashHolder,
  exchange,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Exchange extends Component {
  static propTypes = {
    startFetchIntervaled: PropTypes.func.isRequired,
    setExchangeAmount: PropTypes.func.isRequired,
    setSourceCurrency: PropTypes.func.isRequired,
    setTargetCurrency: PropTypes.func.isRequired,
    exchangeCurrencies: PropTypes.func.isRequired,

    rates: PropTypes.object.isRequired,
    cashHolder: PropTypes.object.isRequired,
    exchange: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.props.startFetchIntervaled();
  }

  render() {
    const { exchange, cashHolder, rates } = this.props;
    const currencies = Object.keys(cashHolder);
    const currencySourceIndex = currencies.indexOf(exchange.currencySource);
    const currencyTargetIndex = currencies.indexOf(exchange.currencyTarget);

    return (
      <div className={styles.exchange}>
        <div className={styles['from-currency']}>
          <SlideSelect
            selected={currencySourceIndex > -1 ? currencySourceIndex : 0}
            onSelect={this.onSourceCurrencySelect}
          >
            {currencies.map(currency => (
              <CurrencySource
                key={currency}
                currency={currency}
                onInput={this.onAmountInput}
                onExchange={this.onExchange}
                { ...({ exchange, cashHolder, rates}) }
              />
            ))}
          </SlideSelect>
        </div>
        <div className={styles['to-currency']}>
          <SlideSelect
            selected={currencyTargetIndex > -1 ? currencyTargetIndex : 0}
            onSelect={this.onTargetCurrencySelect}
          >
            {currencies.map(currency => (
              <CurrencyTarget
                key={currency}
                currency={currency}
                { ...({ exchange, cashHolder, rates}) }
              />
            ))}
          </SlideSelect>
        </div>
      </div>
    );
  }

  onSourceCurrencySelect = (selected) => {
    const { exchange: { currencySource }, cashHolder } = this.props;
    const currencies = Object.keys(cashHolder);
    const newCurrency = currencies[selected];
    if (currencySource === newCurrency) {
      return;
    }

    this.props.setSourceCurrency(newCurrency);
  };

  onTargetCurrencySelect = (selected) => {
    const { exchange: { currencyTarget }, cashHolder } = this.props;
    const currencies = Object.keys(cashHolder);
    const newCurrency = currencies[selected];
    if (currencyTarget === newCurrency) {
      return;
    }

    this.props.setTargetCurrency(newCurrency);
  };

  onAmountInput = (amount) => {
    this.props.setExchangeAmount(amount);
  };

  onExchange = () => {
    const { exchange: { currencySource, currencyTarget, amount }, rates } = this.props;
    const sourceToEur = rates[currencySource];
    const targetToEur = rates[currencyTarget];
    const rate = targetToEur / sourceToEur;
    this.props.exchangeCurrencies({ currencySource, currencyTarget, amount, rate });
  }
}
