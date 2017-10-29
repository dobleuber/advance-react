import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';

class SearchBar extends React.Component {
  state = {
    searchTerm: '',
  }

  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 350);

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    }, () => {
      this.doSearch();
    });
  };

  render() {
    return (
      <input
        ref={input => this.searchInput = input}
        type="text"
        value={this.state.searchTerm}
        placeholder="Enter search term"
        onChange={this.handleSearch}
      />
    );
  }
}

export default storeProvider()(SearchBar);
