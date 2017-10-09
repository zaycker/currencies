import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import currencySigns from 'constants/currencySigns';

export default function CurrencySign({ currency }) {
  return (
    <span className={styles['currency-sign']}>{currencySigns[currency]}</span>
  );
}

CurrencySign.propTypes = {
  currency: PropTypes.string.isRequired,
};
