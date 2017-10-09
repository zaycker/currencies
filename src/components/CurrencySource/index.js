import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrefixedInput from 'components/PrefixedInput';
import CurrencySign from 'components/CurrencySign';
import styles from './styles.css';

export default class CurrencySource extends Component {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    cashHolder: PropTypes.object.isRequired,
    onExchange: PropTypes.func,
    exchange: PropTypes.object.isRequired,
    rates: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onExchange: Function.prototype,
  };

  render() {
    const { exchange: { amountString: value }, currency, cashHolder, onExchange } = this.props;
    return (
      <div className={styles['currency-source']}>
        <div className={styles['currency-source__rate']}>
          {this.getExchangeRate()}
        </div>
        <div className={styles['currency-source__row']}>
          <span className={styles['currency-source__currency']}>
            {currency}
          </span>
          <PrefixedInput
            value={value}
            onInput={this.onInput}
            sign="-"
          />
        </div>
        <div className={styles['currency-source__row']}>
          <span className={styles['currency-source__avail']}>
            {[
              'You have ',
              <CurrencySign currency={currency} key={0} />,
              cashHolder[currency],
            ]}
          </span>
        </div>

        <button
          className={styles['currency-source__exchange']}
          disabled={!this.isExchangeAvailable()}
          onClick={onExchange}
        >Exchange</button>
      </div>
    )
  }

  onInput = (e) => {
    const floatMatches = e.target.value.match(/\d+\.?\d{0,2}/);
    this.props.onInput(floatMatches ? floatMatches[0] : '');
  };

  getExchangeRate() {
    const { exchange: { currencyTarget }, currency, rates } = this.props;
    const sourceToEur = rates[currency];
    const targetToEur = rates[currencyTarget];
    const rate = (Math.round(targetToEur / sourceToEur * 10e4) / 10e4).toFixed(4);

    return [
      <CurrencySign currency={currency} key={0} />,
      '1 = ',
      <CurrencySign currency={currencyTarget} key={1} />,
      rate.slice(0, rate.length - 2),
      <span key={3} className={styles['currency-source__thousands']}>
        {rate.slice(rate.length - 2)}
      </span>
    ];
  }

  isExchangeAvailable() {
    const { exchange: { amount, currencyTarget }, currency, cashHolder } = this.props;

    if (currencyTarget === currency) {
      return false;
    }

    return cashHolder[currency] >= amount;
  }
}
