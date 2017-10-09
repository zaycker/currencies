import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default function PrefixedInput({ value, onInput, readOnly, sign }) {
  return (
    <label className={styles['prefixed-input__label']}>
      <input
        type="text"
        className={styles['prefixed-input__sign']}
        value={`${value && value !== '0' ? sign + value : ''}`}
        readOnly
      />
      <input
        type="text"
        onInput={onInput}
        className={styles['prefixed-input__input']}
        value={value}
        readOnly={!!readOnly}
      />
    </label>
  );
}

PrefixedInput.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func,
  readOnly: PropTypes.bool,
  sign: PropTypes.string,
};

PrefixedInput.defaultProps = {
  value: '',
  onInput: Function.prototype,
  readOnly: false,
  sign: '',
};
