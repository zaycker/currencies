import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Exchange from 'containers/Exchange';
import styles from './styles.css';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div className={styles.app}>
          <Exchange />
        </div>
      </Provider>
    );
  }

  shouldComponentUpdate () {
    return false;
  }
}

export default App;
