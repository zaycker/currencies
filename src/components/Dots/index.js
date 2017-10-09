import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.css';

export default function Dots({ elements, selected, className }) {
  return (
    <div className={classnames(styles['dots'], className)}>
      {Array.apply(null, { length: elements.length }).map((_, i) => (
        <span key={i} className={classnames(
          styles['dots__dot'],
          i === selected && styles['dots__dot_active']
        )} />
      ))}
    </div>
  );
}

Dots.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.number,
  elements: PropTypes.arrayOf(PropTypes.any),
};

Dots.defaultProps = {
  className: '',
  selected: 0,
  elements: [],
};
