import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from 'components/Dots';
import styles from './styles.css';

export default class SwipeSelect extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    selected: PropTypes.number,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    selected: 0,
    onSelect: Function.prototype,
  };

  render() {
    return (
      <div className={styles['slide-select']}>
        <div
          className={styles['slide-select__slides']}
          style={{ left: `${-100 * this.props.selected}%` }}
        >
          {this.props.children}
        </div>
        <Dots
          className={styles['slide-select__dots']}
          elements={this.props.children}
          selected={this.props.selected}
        />
        <button
          onClick={this.onPrev}
          className={styles['slide-select__left']}
        />
        <button
          onClick={this.onNext}
          className={styles['slide-select__right']}
        />
      </div>
    );
  }

  onPrev = () => {
    this.props.onSelect(Math.max(this.props.selected - 1, 0));
  };

  onNext = () => {
    this.props.onSelect(Math.min(this.props.selected + 1, this.props.children.length - 1));
  };
}
