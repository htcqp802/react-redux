import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import {Router, Route, browserHistory} from 'react-router';
import DevTools from './app/containers/DevTools';

import 'todomvc-app-css/index.css';

const store = configureStore();

const component = (
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
  </Router>
)
if (module.hot && !window.devToolsExtension) {
  render(
    <Provider store={store}>
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('root')
  );
} else {
  render(
    <Provider store={store}>
      {component}
    </Provider>,
    document.getElementById('root')
  );
}

