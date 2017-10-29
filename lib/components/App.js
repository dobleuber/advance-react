import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.shape({
      getState: PropTypes.func.isRequired,
    }).isRequired,
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  appState = () => {
    const { articles, searchTerm } = this.props.store.getState();
    return { articles, searchTerm };
  }

  state = this.appState();

  onStoreChange = () => {
    this.setState(this.appState);
  }

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let {articles, searchTerm} = this.state;
    const searchRegex = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, (article) =>
        article.title.match(searchRegex) || article.body.match(searchRegex)
      );
    }

    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    startClock: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
