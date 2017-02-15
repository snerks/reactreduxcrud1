import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import configureStore from './store/configureStore';
import Root from './components/root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
