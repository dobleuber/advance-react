import React from 'react';
import PropTypes from 'prop-types';

import storeProvider from './storeProvider';

class Timestamp extends React.Component {
  static timeDisplay = timestamp =>
    timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  render() {
    return (
      <div>{this.props.timestampDisplay}</div>
    );
  }
}

Timestamp.propTypes = {
  timestampDisplay: PropTypes.string.isRequired,
};

function extraProps(store) {
  return {
    timestampDisplay: Timestamp.timeDisplay(store.getState().timestamp),
  };
}

export default storeProvider(extraProps)(Timestamp);
