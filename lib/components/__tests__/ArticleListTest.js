import React from 'react';
import ArticleList from '../ArticleList';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('ArticleList', () => {
  configure({ adapter: new Adapter() });

  const testProps = {
    articles: {
      a: {
        id: 'a',
      },
      b: {
        id: 'b',
      },
    },
  };

  it('render correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    expect(wrapper.find('ArticleContainer').length).toBe(2);

    expect(wrapper).toMatchSnapshot();
  });
});
