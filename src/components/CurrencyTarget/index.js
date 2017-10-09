import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrencySign from 'components/CurrencySign';
import PrefixedInput from 'components/PrefixedInput';
import styles from './styles.css';

export default class CurrencyTarget extends Component {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    cashHolder: PropTypes.object.isRequired,
    exchange: PropTypes.object.isRequired,
    rates: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={styles['currency-target']}>
        <div className={styles['currency-target__row']}>
          <span className={styles['currency-target__currency']}>
            {this.props.currency}
          </span>
          <PrefixedInput
            value={this.getExchangeValue()}
            sign="+"
            readOnly
          />
        </div>
        <div className={styles['currency-target__row']}>
          <span className={styles['currency-target__avail']}>
            You have {this.getVolumeTargetCurrency()}
          </span>
          <span className={styles['currency-target__rate']}>
            {this.getExchangeRate()}
          </span>
        </div>
      </div>
    );
  }

  getExchangeValue() {
    const { exchange: { amount, currencySource }, currency, rates } = this.props;
    const sourceToEur = rates[currencySource];
    const targetToEur = rates[currency];
    const value = amount * targetToEur / sourceToEur;
    return value ? Math.round(value * 100) / 100 : '';
  }

  getVolumeTargetCurrency() {
    const { exchange: { currencyTarget }, cashHolder } = this.props;
    return [
      <CurrencySign currency={currencyTarget} key={0} />,
      cashHolder[currencyTarget],
    ];
  }

  getExchangeRate() {
    const { exchange: { currencySource }, currency, rates } = this.props;
    const sourceToEur = rates[currencySource];
    const targetToEur = rates[currency];

    if (currency === currencySource) {
      return '';
    }

    return [
      <CurrencySign currency={currency} key={0} />,
      '1 = ',
      <CurrencySign currency={currencySource} key={1} />,
      Math.round((sourceToEur / targetToEur) * 100) / 100,
    ];
  }
}
