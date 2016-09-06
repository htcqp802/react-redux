import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  const middleware = [];
  let finalCreateStore;
  if (module.hot) {
    const {persistState} = require('redux-devtools');
    const DevTools = require('../containers/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }
  const store = finalCreateStore(rootReducer, initialState);
  return store;
}
